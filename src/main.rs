use clap::Parser;
use image::{self, GenericImageView};
use kmeans_colors::get_kmeans;
use palette::Srgb;

#[derive(Parser, Debug)]
#[command(
    name = "walrs",
    version,
    about = "A simple pywal‑like theme generator written in Rust"
)]
struct Args {
    image: String,

    #[arg(short = 'c', long, default_value_t = 16)]
    colors: usize,
}

fn load_image(path: &str) -> image::ImageResult<image::DynamicImage> {
    image::open(path)
}

fn extract_pixels(img: &image::DynamicImage) -> Vec<(u8, u8, u8)> {
    img.pixels()
        .filter_map(|(_, _, px)| {
            let rgba = px.0;
            if rgba[3] < 10 {
                return None;
            }
            Some((rgba[0], rgba[1], rgba[2]))
        })
        .collect()
}

fn average_color(pixels: &[(u8, u8, u8)]) -> (u8, u8, u8) {
    let mut r_sum: u64 = 0;
    let mut g_sum: u64 = 0;
    let mut b_sum: u64 = 0;

    let count = pixels.len() as u64;
    if count == 0 {
        return (0, 0, 0);
    }

    for &(r, g, b) in pixels {
        r_sum += r as u64;
        g_sum += g as u64;
        b_sum += b as u64;
    }

    (
        (r_sum / count) as u8,
        (g_sum / count) as u8,
        (b_sum / count) as u8,
    )
}

fn pixels_to_srgb(pixels: &[(u8, u8, u8)]) -> Vec<Srgb<f32>> {
    pixels
        .iter()
        .map(|&(r, g, b)| Srgb::new(r as f32 / 255.0, g as f32 / 255.0, b as f32 / 255.0))
        .collect()
}

fn main() {
    let args = Args::parse();

    let img = match load_image(&args.image) {
        Ok(img) => img,
        Err(e) => {
            eprintln!("Failed to load image: {e}");
            std::process::exit(1);
        }
    };

    println!("Loaded image: {}x{}", img.width(), img.height());

    let resized = img.thumbnail(300, 300);

    let pixels = extract_pixels(&resized);
    println!("Number of visible pixels: {}", pixels.len());

    let avg = average_color(&pixels);
    println!("Average color: #{:02X}{:02X}{:02X}", avg.0, avg.1, avg.2);

    let pixels_srgb = pixels_to_srgb(&pixels);

    let k = args.colors;
    let max_iter = 10;
    let converge = 0.001_f32;
    let verbose = false;
    let seed = 42;

    let result = get_kmeans(k, max_iter, converge, verbose, &pixels_srgb, seed);
    let palette = result.centroids;

    println!("Generated palette:");
    for (i, color) in palette.iter().enumerate() {
        let r = (color.red * 255.0).round() as u8;
        let g = (color.green * 255.0).round() as u8;
        let b = (color.blue * 255.0).round() as u8;

        println!("Color {}: #{:02X}{:02X}{:02X}", i + 1, r, g, b);
    }
}

