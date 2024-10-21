export default function ImagePreviewBox(
  filePath: string,
  rounded: boolean = false
) {
  return (
    <img
      src={filePath}
      alt="Image Preview"
      className={`w-24 h-24 ${rounded && 'rounded-full'} border border-gray-300 object-cover mr-4`}
    />
  )
}
