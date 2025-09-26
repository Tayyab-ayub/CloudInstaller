'use client';
import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import moment from "moment";
import { IoLogoAndroid, IoLogoApple } from "react-icons/io";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ApiRoutes from '../helpers/ApiRoutes';
import toast from 'react-hot-toast';
import { deletefile } from '../redux/slices/userSlice';
import DeleteModal from '../DeleteModal'
import { unwrapResult } from '@reduxjs/toolkit'

const Page = ({listapps}) => {
    const dispatch = useDispatch()

    // const { listapps } = useSelector((state) => state.userSlice);
    const [pageList, setPageList] = useState([])
    const [showdeletemodal, setshowdeletemodal] = useState(false);
    const [selecteditem, setselecteditem] = useState(null);
    
    useEffect(() => {
        if (listapps.length === 0) {
            setPageList([])
            return
        }
        setPageList(listapps)
    }, [listapps])

    useEffect(() => {
    }, [selecteditem])


    const deleteFileList = (id) => {
       dispatch(deletefile({ id }))
            .then(unwrapResult)
            .then((resp) => {
                console.log("DeleteFile", resp);

            })
            .catch((error) => {
                console.log("Error", error);
            });
    };

    const renderListItem = (item) => {
        return <tr className='text-center' key={item.id}>
            <td className='flex justify-center items-center text-center '>
                {item.id == "apk" ? (
                    <IoLogoAndroid className="text-2xl" />
                ) : (
                    <IoLogoApple className="text-2xl" />
                )}
            </td>
            <td>{item.type}</td>
            <td>{item.bundle_identifier}</td>
            <td>{item.version_code}</td>
            <td>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={(e) => {
                        if (!moment(item.valid_until).isAfter(moment())) {
                            e.preventDefault();
                            toast.error("Link expired");
                        }
                    }}
                >
                    {moment(item.valid_until).isAfter(moment()) ? (
                        <a
                            href={
                                item.type === "apk"
                                    ? `${ApiRoutes.DOWNLOAD_ASSET_URL}${ApiRoutes.ENDPOINTS.download}${item.type}/${item.token}/`
                                    : `itms-services://?action=download-manifest&url=${ApiRoutes.DOWNLOAD_ASSET_URL}${ApiRoutes.ENDPOINTS.download}${item.type}/${item.token}/`
                            }
                            download={item.type === "apk" ? "myapp.apk" : undefined}
                            className="w-full h-full inline-block text-primary"
                            onClick={(e) => {
                                if (!moment(item.valid_until).isAfter(moment())) {
                                    e.preventDefault();
                                    toast.error("Link expired");
                                }
                            }}
                        >
                            Install
                        </a>
                    ) : (
                        "Link Expired"
                    )}
                </button>

            </td>
            <td>{moment(
                moment.utc(item.valid_until).toDate()
            ).format("YYYY-MM-DD")}</td>

            {/* <div className='inline-flex space-x-2 py-2 pr-2'>
                                <button className='px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition'>Copy



                                </button>
                                <button className='px-3 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition'>Delete</button>
                              </div> */}
            <td className='inline-flex space-2 py-2 pr-2 space-x-2'>
                {moment(
                    moment(
                        moment.utc(item.valid_until).toDate()
                    )
                ).isAfter(moment()) ? (
                    <CopyToClipboard
                        text={`${window.location.origin}/CopyPublicAccess/${item.type}/${item.token}`}
                    >
                        {
                            <button
                                onClick={() => {
                                    toast.success("Copied");

                                }}
                                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                            >
                                Copy
                            </button>
                        }
                    </CopyToClipboard>

                ) : (
                    ""
                )}
                <button
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
                    onClick={() => {
                        setselecteditem(item);
                        setshowdeletemodal(true);
                    }}
                >
                    Delete
                </button>

            </td>


        </tr>

    }
    return (
        <>

            <div className=" flex justify-center">

                <table className="border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50 font-bold text-gray-500 uppercase">
                        <tr>
                            <th className="px-6 py-3 text-left border-b f">Logo</th>
                            <th className="px-6 py-3 text-left border-b">App Name</th>
                            <th className="px-6 py-3 text-left  border-b">App Build</th>
                            <th className="px-6 py-3 text-left border-b">App Identifier</th>
                            <th className="px-6 py-3 text-left border-b">Link</th>
                            <th className="px-6 py-3 text-left border-b">Expiry Date</th>
                            <th className="px-6 py-3 text-left border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm text-gray-800" style={{ minHeight: "20vh" }}>
                        {
                            false ? (
                                <tr><td colSpan={7}>Loading.... </td></tr>
                            ) :
                                (
                                    Array.isArray(pageList) && pageList.length > 0 ? pageList.map((item, _) => {
                                        return renderListItem(item)
                                    }) : (
                                        <tr>
                                            <td colSpan={7}> No Record found</td>
                                        </tr>
                                    )
                                )
                        }

                    </tbody>
                </table>

            </div>
            {showdeletemodal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 ">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <DeleteModal
                            item={selecteditem}
                            onClose={() => setshowdeletemodal(false)
                            }
                            onClickDeletemodal={deleteFileList}
                        />

                    </div>
                </div>
            )}


        </>





    )

}
export default Page;