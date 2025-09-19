  import { AppConstants } from '../../app/helpers/AppConstants'
  import React, { useEffect, useState} from 'react'
  import { toast } from 'react-hot-toast';
  import { useDispatch, useSelector } from 'react-redux';
  import { unwrapResult } from '@reduxjs/toolkit';
  import { fileUpload, fileUploadReset } from '../../app/redux/slices/userSlice';
  import FileUpload from '../../FileUpload/FilePublicAccess';
 

  const Page = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const [isFileUploaded, setIsFileUploaded] = useState(false)
    const { user, authToken, fileProgress,loading } = useSelector((state) => state.userSlice);
     
    useEffect(()=>{
      dispatch(fileUploadReset())
      setIsFileUploaded(false)
    },[])

  //   useEffect(() => {
  //   if(fileProgress === 0) return 
  //   console.log("File ----",fileProgress)
  // },[fileProgress])


    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (!file) {
        setError(null);
        return;
      }

        

      const fileName = file.name.toLowerCase();

      const isValid = fileName.endsWith('.apk') || fileName.endsWith('.ipa');

      if (!isValid) {

        setError('Invalid file format. Please upload an .apk or .ipa file.');
        event.target.value = null;
        setSelectedFile(null);
        return;
      }
      setError(null);
      setSelectedFile(file);
    };



    const handleUpload = (e) => {
      e.preventDefault();

      if (!selectedFile) {
        setError('Please select a file to upload.');
        return;
      }

      let uploadPayload = new FormData();
      uploadPayload.append("file", selectedFile);

      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      uploadPayload.append(
        "type",
        fileExtension === "ipa" ? "ipa" : "apk"
      );

      // Add user and token if available
      if (user && user.id && authToken) {
        uploadPayload.append("user", user.id);
        uploadPayload.append("token", authToken);
      }

      // Dispatch the correct fileUpload action
      dispatch(fileUpload(uploadPayload))
        .then(unwrapResult)
        .then((res) => {
          console.log("File Upload Response ----", res);
          toast.success("File uploaded successfully!");
          setSelectedFile(null);
          setIsFileUploaded(true)
          
        })
        .catch((err) => {
          console.error("File Upload Error ----", err);
          toast.error(err.message || "File upload failed.");
        });
    };

    return (
      
      
         

      <div className="mt-10 container font-sans mx-auto px-4">
        {/* Headings */}
        <div className="text-center">
          <h1 className="mt-5 mb-3 text-4xl md:text-4xl uppercase font-semibold leading-tight">
            {AppConstants.Sectionheading}
          </h1>
          <h2 className="text-lg md:text-xl italic text-gray-700 w-4/5 mx-auto">
            {AppConstants.Sectionsubheading}
          </h2>
        </div>

        {/* Process Steps */}
        <div id="uploadForm" className="pt-5 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  bg-gradient-to-r from-violet-200 to-violet-200 rounded-2xl">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center ">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center w-16 h-16 mb-4 text-white">
              {/* Upload Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
                />
                <path
                  fillRule="evenodd"
                  d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"
                />
              </svg>
            </div>
            <h3 className="text-xl uppercase font-bold"> {AppConstants.upload} </h3>
            <p className="text-gray-600 font-medium">
              {AppConstants.uploadsubheading}
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center w-16 h-16 mb-4 text-white">
              {/* Submit Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-white"
              >
                <path d="M3 12l18-9-9 18-2-7-7-2z" />
              </svg>
            </div>
            <h3 className="text-xl uppercase font-bold">{AppConstants.submit}</h3>
            <p className="text-gray-600 font-medium">
              {AppConstants.submitsubheading}
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center w-16 h-16 mb-4 text-white">
              {/* Share Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-white"
              >
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77l-7.13-3.56a2.48 2.48 0 0 0 0-2.59l7.13-3.56A2.5 2.5 0 1 0 15 5a2.5 2.5 0 0 0 .04.45l-7.13 3.56a2.48 2.48 0 0 0 0 2.59l7.13 3.56A2.5 2.5 0 1 0 18 16.08z" />
              </svg>
            </div>
            <h3 className="text-xl uppercase font-bold">{AppConstants.share}</h3>
            <p className="text-gray-600 font-medium">
              {AppConstants.sharesubheading}
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center w-16 h-16 mb-4 text-white">
              {/* Open Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-white"
              >
                <path d="M14 3v2h3.59L10 12.59 11.41 14 19 6.41V10h2V3z" />
                <path d="M5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5z" />
              </svg>
            </div>
            <h3 className="text-xl uppercase font-bold"> {AppConstants.open}</h3>
            <p className="text-gray-600 font-medium">
              {AppConstants.opensubheading}
            </p>
          </div>
        </div>

        {/* Upload Form */}
         
        <form className="my-6">
           <div>
    
      {isFileUploaded &&  !loading ? (
        <FileUpload  onClickUploadNewFile={()=>{
          setIsFileUploaded(false)
        }}/>
      ) : (
      //   <div>
      
      //     <input
      //       type="file"
      //       accept=".apk,.ipa"
      //       onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
      //     />
      // </div>
      



        
    
   
  
  
 
          <label htmlFor="file-upload" className="border-2 border-dashed flex-col border-gray-400 rounded-lg cursor-pointer flex items-center justify-center min-h-[30vh]">
            <input id="file-upload" name="file-upload" type="file" className="hidden" required onChange={handleFileChange} accept=".apk,.ipa" />
            {selectedFile ? (
              <div className="text-center text-gray-700 flex flex-col items-center">
                {/* File Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="font-medium">Selected file:</p>
                <p className="font-bold text-lg">{selectedFile.name}</p>
              </div>
            ) : error ? (
              <div className="text-center text-red-600 flex flex-col items-center">
                {/* Error Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-bold">Upload Error</p>
                <p>{error}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-600">
                {/* Upload Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-8 h-8 text-grey"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"
                  />
                </svg>
                <span>{AppConstants.file}</span>
                <p className="text-sm text-gray-500">{AppConstants.dragordrop}</p>
              </div>
            
             
         
          
           )}
          {(loading && fileProgress > 0 && fileProgress <= 100) && (
            <div className="w-full bg-gray-200 rounded-full h-6 my-4 dark:bg-gray-700">
              <div
                className="bg-violet-600 h-6 rounded-full text-center text-white text-sm leading-6 transition-all duration-500 ease-out"
                style={{ width: `${fileProgress}%` }}>
                {fileProgress > 5 && `${fileProgress}%`}
              </div>
            </div>
          )}
           
          {/* Captcha / Verification */}
          <div className="justify-center mt-4">
            <button
              type="submit"
              className="w-[300px] h-[65px] bg-violet-700 text-white flex items-center justify-center rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleUpload}
              disabled={(loading && fileProgress > 0 && fileProgress <= 100) || !selectedFile}
            >
              {(loading && fileProgress > 0 && fileProgress <= 100) ? 'Uploading...' : 'Upload'}
            </button>
          </div>
           
           </label>
      )}
           </div>
        </form>
          
        
            
    </div>
    
    )}
        
    
      
    







  


  export default Page;
