import { Progress } from 'antd';
import React, { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { fileUploadService } from '../../api';


interface ProgressInfos {
    val: { percentage: number, fileName: string }[]
}
interface FileTableProps {
    fileInfos: any,
    setFileInfos: any
}
const FileTable: React.FunctionComponent<FileTableProps> = ({ fileInfos, setFileInfos }) => {
    useEffect(() => {
        fileUploadService.getFiles().then((res) => {
            setFileInfos(res.data.sum)
        })
    })
    return (
        <div>
            文件 / 文件夹数量 : {fileInfos}
        </div>
    )
}
const UploadFiles: React.FunctionComponent = () => {
    //已选中的文件
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    //进度条相关信息
    const [progressInfos, setProgressInfos] = useState<ProgressInfos>({ val: [] });
    //上传信息
    const [message, setMessage] = useState(['']);
    //存在文件
    const [fileInfos, setFileInfos] = useState([]);
    const progressInfosRef = useRef<ProgressInfos | undefined>(undefined)

    // 获取选中的fileList
    const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files
        setSelectedFiles(files)
        setProgressInfos({ val: [] });
    }

    const uploadFiles = async () => {
        const files = Array.from(selectedFiles as FileList)
        const progressInfosInit = (files: File[]) =>
            files.map((file) => ({
                percentage: 0,
                fileName: file.name,
            }))
        let _progressInfos = progressInfosInit(files)

        progressInfosRef.current = {
            val: _progressInfos
        }
        // 将多个文件的上传接口使用promise封装
        const uploadPromises = files.map((file, i) => upload(file, i))
        //等待上传完
        try {
            await Promise.all(uploadPromises)
            // 上传完成后重新拉取files
        } catch (err) {
            console.log(err);
            return
        }
        const newFiles = await fileUploadService.getFiles()
        setFileInfos(newFiles.data)
        setMessage([])
    }

    const upload = async (file: File, index: number) => {
        let _progressInfos = [...progressInfosRef.current!.val]
        try {
            await fileUploadService.fileUpload(file, (event: ProgressEvent) => {
                _progressInfos[index].percentage = Math.round(100 * event.loaded / event.total);
                setProgressInfos({ val: _progressInfos });
            });

            setMessage((prevMessage) => (
                [...prevMessage, file.name + "文件上传成功:"]
            ));
        } catch {
            _progressInfos[index].percentage = 0;
            setProgressInfos({ val: _progressInfos });
            setMessage((prevMessage) => ([
                ...prevMessage,
                "上传文件失败: " + file.name,
            ]));
        }
    }
  
    return (
        <div>
            <FileTable fileInfos={fileInfos} setFileInfos={setFileInfos}></FileTable>
            <input type="file" multiple onInput={selectFiles} />
            <button onClick={uploadFiles}>测试上传</button>
            <div>
                <Progress percent={30} style={{ width: '300px' }} ></Progress>
            </div>
        </div>
    )
}

export default UploadFiles

