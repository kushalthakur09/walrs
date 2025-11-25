use clap::Parser;
use walrs::image::{load_image, extract_pixels};
use walrs::palette::{average_color, generate_palette};
use palette::rgb::Srgb;

#[derive(Parser, Debug)]
#[command(
    name = "walrs",
    version,
    about = "A simple pywal-like theme generator written in Rust"
)]
struct Args {
    image: String,

    #[arg(short = 'c', long, default_value_t = 16)]
    colors: usize,
}

fn main() {
    let args = Args::parse();

    let img = match load_image(&args.image) {
        Ok(img) => img,
        Err(e) => {
            eprintln!("{e}");
            std::process::exit(1);
        }
    };

    println!("Loaded image: {}x{}", img.width(), img.height());

    let resized = img.thumbnail(300, 300);

    let pixels = extract_pixels(&resized);
    println!("Number of visible pixels: {}", pixels.len());

    let avg = average_color(&pixels);
    println!("Average color: #{:02X}{:02X}{:02X}", avg.0, avg.1, avg.2);

    let palette: Vec<Srgb<f32>> = generate_palette(&pixels, args.colors);

    println!("Generated palette:");
    for (i, color) in palette.iter().enumerate() {
        let r = (color.red * 255.0).round() as u8;
        let g = (color.green * 255.0).round() as u8;
        let b = (color.blue * 255.0).round() as u8;

        println!("Color {}: #{:02X}{:02X}{:02X}", i + 1, r, g, b);
    }
}

