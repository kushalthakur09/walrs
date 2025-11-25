use clap::Parser;
use image::{self, GenericImageView};

#[derive(Parser, Debug)]
#[command(name = "walrs", version, about = "A simple theme generator")]
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
            if rgba[3] < 10 { return None; }
            Some((rgba[0], rgba[1], rgba[2]))
        })
        .collect()
}

fn main() {
    let args = Args::parse();

    match load_image(&args.image) {
        Ok(img) => {
            println!("Loaded image: {}x{}", img.width(), img.height());

            let resized = img.thumbnail(300, 300);
            let pixels = extract_pixels(&resized);
            println!("Number of visible pixels: {}", pixels.len());
        }
        Err(e) => {
            eprintln!("Failed to load image: {e}");
            std::process::exit(1);
        }
    }
}
