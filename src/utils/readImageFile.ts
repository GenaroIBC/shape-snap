import { KnownError, KnownResult } from '../types';

type KnownResponse = KnownError | KnownResult<ImageFileData>;

type ImageFileData = {
  src: string;
  title: string;
};

const DEFAULT_ERROR_MSG = 'There was an error reading your image, please try again';
const FILETYPE_ERROR_MSG = 'Please upload an image file. Supported formats: png, jpg, jpeg, webp, gif, and svg';

export async function readImageFile(imageFile: File): Promise<KnownResponse> {
  const isImageFile = imageFile.type.split('/')[0] === 'image';

  if (!isImageFile) {
    return {
      ok: false,
      error: FILETYPE_ERROR_MSG
    };
  }

  const reader = new FileReader();
  reader.readAsDataURL(imageFile);

  const result: KnownResponse = await new Promise((resolve) => {
    reader.onerror = () => {
      resolve({ ok: false, error: DEFAULT_ERROR_MSG });
    };

    reader.onloadend = () => {
      const imgUrl = reader.result;

      if (typeof imgUrl === 'string') {
        resolve({
          ok: true,
          data: {
            src: imgUrl,
            title: imageFile.name
          }
        });
      }

      if (imgUrl instanceof ArrayBuffer) {
        resolve({
          ok: true,
          data: {
            src: URL.createObjectURL(new Blob([imgUrl])),
            title: imageFile.name
          }
        });
      }
    };
  });

  return result;
}