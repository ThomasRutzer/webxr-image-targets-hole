const prepareImage = async imageBitmapSrc => {
  return new Promise(async (res, rej) => {
    try {
      const bitmap = await createImageBitmap(imageBitmapSrc)
      res(bitmap)
    } catch (e) {
      rej(e)
    }
  })
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