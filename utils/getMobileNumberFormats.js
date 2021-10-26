const getMobileNumberFormats = (number) => {
  const formats = [number.trim()]
  if(number.startsWith('0')) {
    formats.push(`62${number.slice(1)}`)
  } else if(number.startsWith('62')) {
    formats.push(`0${number.slice(2)}`)
  } else {
    throw new Error('Invalid mobile number.')
  }
  return formats
}

module.exports = getMobileNumberFormats