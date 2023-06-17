import { RowDataPacket } from "mysql2";
import pool  from "../../util/mysql";
import { File } from "../../model/types";


declare global {
  var pic_cache_paths: Map<string, File>;
}



//const [file] =  await pool.query<RowDataPacket[]>(
  //"SELECT file_name, path FROM file"
//);


export const getFileByFileId = async (
  fileId: string
): Promise<File> => {

  if (globalThis.pic_cache_paths == undefined ) {
    globalThis.pic_cache_paths = await buildPicCache();
  }
  //console.log("lolo: ", globalThis.pic_cache_paths);
  
  let res;
  if ( globalThis.pic_cache_paths != undefined && globalThis.pic_cache_paths.get(fileId) ) {
    res = globalThis.pic_cache_paths.get(fileId);
  } else {
    res = {
      fileName: 'aaa',
      path: 'bbb',
    }
  }

  return res as File;
  /*
  const [file] = await pool.query<RowDataPacket[]>(
    "SELECT file_name, path FROM file WHERE file_id = ?",
    [fileId]
  );
  if (file.length === 0) {
    return;
  }

  return {
    fileName: file[0].file_name,
    path: file[0].path,
  };
  */
};


export const buildPicCache = async (): Promise < Map<string,File>> => {
  const [file] = await pool.query<RowDataPacket[]>(
    "SELECT file_name, path, file_id FROM file"
  );
  let res = new Map<string,File>();

  if (file.length === 0) {
    return res;
  }

  for (const f of file) {
    res.set(f.file_id, {
      fileName: f.file_name,
      path: f.path,
    })
  }
  return res;
  //return {
    //fileName: file[0].file_name,
    //path: file[0].path,
  //};
};
