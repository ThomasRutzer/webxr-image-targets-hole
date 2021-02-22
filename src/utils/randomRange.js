const randomRange = (min, max) => {
  const result = min + (max - min) * Math.random()
  return Number(result.toFixed(1))
}

export default randomRange