use clap::Parser;
use image;

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

fn main() {
    let args = Args::parse();

    match load_image(&args.image) {
        Ok(img) => {
            println!("Loaded image: {}x{}", img.width(), img.height());
        }
        Err(e) => {
            eprintln!("Failed to load image: {e}");
            std::process::exit(1);
        }
    }

    println!("Image: {}", args.image);
    println!("Colors: {}", args.colors);
}
