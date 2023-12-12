import FormData from "form-data";
import { uploadFiles, DocumentDirectoryPath } from "react-native-fs";
import axios from "axios";
import ReactNativeBlobUtil from "react-native-blob-util";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

// import RFNS from "react-native-fs";

const url = "https://cths.instructure.com/api/v1/users/self/files";

const checkFileExists = async (image_uri) => {
  try {
    const { uri } = await FileSystem.getInfoAsync(image_uri);

    const fileBuffer = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    // console.log(fileBuffer);

    // console.log("uri ", uri);
    return fileBuffer;
  } catch (errr) {
    console.log(errr);
  }
};

const uploadFileUsingExpo = async (url: string, fileURI: string) => {
  try {
    const response = await FileSystem.uploadAsync(url, fileURI, {
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    });
    return JSON.stringify(response);
    console.log(JSON.stringify(response));
  } catch (err) {
    console.log("there has been an errro");
  }
};

const uploadFile = (file: string) => {
  let uploadURL = " ";
  let params: object;
  console.log(file);

  const formData = new FormData();

  formData.append("name", file["name"]);
  formData.append("content_type", file["mimeType"]);
  axios
    .post(url, formData, {
      headers: {
        Authorization: `Bearer ${process.env.CANVAS_API_TOKEN}`,
      },
    })
    .then((res) => {
      uploadURL = res.data.upload_url;
      params = res.data.upload_params;
      const baseURl = res.data.upload_url;
      const regex = /token=([^&]+)/;
      const matches = baseURl.match(regex);
      const token = matches && matches[1];
      // console.log(res);

      const part2_form = new FormData();

      checkFileExists(file["uri"]).then((data) => {
        // part2_form.append("content_type", "application/pdf");
        console.log(res);
        part2_form.append("filename", "new.txt");
        part2_form.append("file", file["uri"], "file");

        var requestOptions = {
          method: "POST",
          body: part2_form,
        };
        // console.log("URL URL URL URL URL ", uploadData.uploadURL);
        let response = uploadFileUsingExpo(uploadURL, file["uri"]);
        var formdata = new FormData();

        response.then((res) => {
          const newres = JSON.parse(res);
          const newbody = JSON.parse(newres["body"]);
          formdata.append("submission[submission_type]", "online_upload");
          formdata.append("submission[file_ids][]", newbody["id"]);
          const POST_TO_API = fetch(
            "https://cths.instructure.com/api/v1/courses/14477/assignments/190971/submissions?access_token=11644~TKNjsGpTONBSrszQ3hbh34K9L5iYfwEJW4KqrbFHt6cs51BGWmmQ0mFUwByuvyh1",
            {
              method: "POST",
              body: formdata,
            },
          )
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        });

        // part 3 submit to assignment api
      });
    });
  // RNFetchBlob.fetch("POST", uploadURL, {}, RNFetchBlob.wrap(file["uri"]));
};

export default uploadFile;
