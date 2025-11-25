use palette::rgb::Srgb;
use kmeans_colors::get_kmeans;

pub fn average_color(pixels: &[(u8, u8, u8)]) -> (u8, u8, u8) {
    let mut r = 0u64;
    let mut g = 0u64;
    let mut b = 0u64;

    let count = pixels.len() as u64;
    if count == 0 {
        return (0, 0, 0);
    }

    for &(rr, gg, bb) in pixels {
        r += rr as u64;
        g += gg as u64;
        b += bb as u64;
    }

    ((r / count) as u8, (g / count) as u8, (b / count) as u8)
}

fn to_srgb(pixels: &[(u8, u8, u8)]) -> Vec<Srgb<f32>> {
    pixels
        .iter()
        .map(|&(r, g, b)| Srgb::new(r as f32 / 255.0, g as f32 / 255.0, b as f32 / 255.0))
        .collect()
}

pub fn generate_palette(pixels: &[(u8, u8, u8)], k: usize) -> Vec<Srgb<f32>> {
    let srgb_pixels = to_srgb(pixels);

    let max_iter = 10;
    let converge = 0.001;
    let verbose = false;
    let seed = 42;

    let result = get_kmeans(k, max_iter, converge, verbose, &srgb_pixels, seed);

    result.centroids
}

