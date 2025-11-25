use image::{self, GenericImageView};

pub fn load_image(path: &str) -> image::ImageResult<image::DynamicImage> {
    image::open(path)
}

pub fn extract_pixels(img: &image::DynamicImage) -> Vec<(u8, u8, u8)> {
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

