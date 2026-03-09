export default function FileUpload({ 
  file, 
  onFileChange, 
  accept, 
  label, 
  id,
  type = "file" // "file" or "image"
}) {
  const isImage = type === "image";
  const bgColor = isImage ? "bg-[#fef9e7]" : "bg-[#e8eaf6]";
  const borderColor = isImage ? "border-[#f0e0a0]" : "border-[#c5c8e8]";
  const hoverColor = isImage ? "hover:bg-[#fef3c7]" : "hover:bg-[#dde0f5]";
  const textColor = isImage ? "text-[#b48557]" : "text-[#7c7fc4]";
  const height = isImage ? "h-[160px]" : "h-[120px]";

  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          {label}
        </label>
      )}
      
      <input
        type="file"
        accept={accept}
        onChange={(e) => onFileChange(e.target.files[0])}
        className="hidden"
        id={id}
      />
      
      <label
        htmlFor={id}
        className={`w-full ${height} ${bgColor} border ${borderColor} rounded-lg flex flex-col items-center justify-center cursor-pointer ${hoverColor} transition-colors overflow-hidden`}
      >
        {file ? (
          isImage ? (
            <img 
              src={URL.createObjectURL(file)} 
              alt="Preview" 
              className="w-full h-full object-cover" 
            />
          ) : (
            <>
              <svg className="w-8 h-8 text-green-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm text-green-600 font-medium">{file.name}</p>
            </>
          )
        ) : (
          <>
            <svg className={`w-${isImage ? '10' : '8'} h-${isImage ? '10' : '8'} ${textColor} mb-${isImage ? '2' : '1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isImage ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              )}
            </svg>
            <p className={`text-sm ${textColor} font-medium`}>
              {isImage ? "Upload Cover" : label || "Upload File"}
            </p>
          </>
        )}
      </label>
    </div>
  );
}