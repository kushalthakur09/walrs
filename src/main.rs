use clap::Parser;

#[derive(Parser, Debug)]
#[command(name = "walrs", version, about = "A simple theme generator")]
struct Args {
    image: String,

    #[arg(short = 'c', long, default_value_t = 16)]
    colors: usize,
}

fn main() {
    let args = Args::parse();
    println!("Image: {}", args.image);
    println!("Colors: {}", args.colors);
}
