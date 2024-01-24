// make sure to install imagemin, imagemin-mozjpeg, imagemin-pngquant, imagemin-svgo, imagemin-gifsicle
// npm install imagemin imagemin-mozjpeg imagemin-pngquant imagemin-svgo imagemin-gifsicle
// import the packages
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import imageminGifsicle from 'imagemin-gifsicle';

(async () => {
    const files = await imagemin(['public/images/*.{jpg,png,svg,gif}'], {
        destination: 'public/optimizedImages',
        plugins: [
            imageminMozjpeg({ quality: 75 }),
            imageminPngquant({
                quality: [0.6, 0.8]
            }),
            imageminSvgo(),
            imageminGifsicle()
        ]
    });

    console.log(files);
    console.log('Images optimized');
})();
