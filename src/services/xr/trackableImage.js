const prepareImage = async imageBitmapSrc => {
  return createImageBitmap(imageBitmapSrc)
}

const destroyImage = bitmap => {
  return bitmap.close()
}

export const trackableImage = async (image, width) => {
  return new Promise((res, rej) => {
    prepareImage(image)
      .then(bitmap => {
        res({
          image: {
            image: bitmap,
            widthInMeters: width
          },
          destroy: () => destroyImage(bitmap)
        })
      })
      .catch(e => rej(e))
  })
}