import firestore from '@react-native-firebase/firestore';
import FBStorage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import RNFS from 'react-native-fs';
import auth from '@react-native-firebase/auth';
import {convertDBSnapshoptToArrayOfObject} from '../utils/helpers';
export const checkIfDetailsExistByPhone = async (phone) => {
  return await firestore()
    .collection('vendors')
    .where('phoneNumber', '==', phone)
    .get()
    .then(async (res) => {
      if (res.docs.length > 0) {
        const imgUrl = await getImagefromFBStorage(res.docs[0].data().image);
        return {...res.docs[0].data(), image: imgUrl};
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};
export const uploadImageToStorage = async (imageName, uploadUri, CB) => {
  const data = await RNFS.readFile(uploadUri, 'base64');
  FBStorage()
    .ref(imageName)
    .putString(data, 'base64')
    .then((snapshot) => {
      CB && CB(snapshot);
      //You can check the image is now uploaded in the storage bucket
      console.log(`${imageName} has been successfully uploaded.`);
    })
    .catch((e) => {
      CB && CB();
      console.log('uploading image error => ', e);
    });
};


export const getCollectionDocumentByFieldss = async (
  collection,
  fieldName,
  fieldValue,
) => {
  return await firestore()
    .collection(collection)
    .where(fieldName, '==', fieldValue)
    .get()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};

export const updateCollectionDocumentByFieldss = async (
  collection,
  docId,
  fields
) => {
  return await firestore()
    .collection(collection)
    .doc(docId)
    .update(fields)
    .then(() => {
      console.log("user updated");
      return "done";
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};

export const getCurrentUserDetails = async () => {
  return getCollectionDocumentByField(
    'vendors',
    'uid',
    auth().currentUser.uid,
  )
    .then((res) => {
      return res.data();
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};

export const insertToFirestore = (data, collection, CB) => {
  firestore()
    .collection(collection)
    .add(data)
    .then((res) => {
      CB && CB();
    })
    .catch((err) => {
      CB && CB();
      console.log(err);
    });
};
export const getImagefromFBStorage = async (imgPath) => {
  const ref = FBStorage().ref(imgPath);
  try {
    const url = await ref.getDownloadURL();
    return url;
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const getAFieldValueFromACollectionDocumentByAField = async (
  fieldForWhere,
  value,
  FieldToGet,
  collection,
) => {
  return await firestore()
    .collection(collection)
    .where(fieldForWhere, '==', value)
    .get()
    .then((res) => {
      if (res.docs.length > 0) {
        return res.docs[0].data()[FieldToGet]
          ? res.docs[0].data()[FieldToGet]
          : null;
      } else {
        return null;
      }
    });
};
export const getCollectionByField = async (
  collection,
  fieldName,
  fieldValue,
) => {
  return await firestore()
    .collection(collection)
    .where(fieldName, '==', fieldValue)
    .get()
    .then((res) => {
      return res.docs;
    })
    .catch((res) => {
      console.log(res);
      return [];
    });
};
export const getCollectionDocumentByField = async (
  collection,
  fieldName,
  fieldValue,
) => {
  return await firestore()
    .collection(collection)
    .where(fieldName, '==', fieldValue)
    .get()
    .then((res) => {
      return res.docs[0];
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};
export const deleteADocumentByField = async (
  collection,
  fieldName,
  fieldvalue,
) => {
  await firestore()
    .collection(collection)
    .where(fieldName, '==', fieldvalue)
    .get()
    .then(async (res) => {
      if (res.docs.length > 0) {
        let docId = res.docs[0].id;
        await firestore()
          .collection(collection)
          .doc(docId)
          .delete()
          .then((res) => {})
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deleteADocumentById = async (collection, docId) => {
  await firestore()
    .collection(collection)
    .doc(docId)
    .delete()
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};

// database helpers
export const insertIntoDatabaseRef = async (ref, data, CB) => {
  await database()
    .ref(ref)
    .push(data)
    .then((res) => {
      CB && CB(res.key);
    })
    .catch((err) => {
      console.log(err);
      CB && CB();
    });
};
export const readFromDatabaseRefwithField = async (
  ref,
  fieldName,
  fieldValue,
  CB,
) => {
  await database()
    .ref(ref)
    .once('value')
    .then((snapshot) => {
      CB &&
        CB(
          convertDBSnapshoptToArrayOfObject(snapshot).filter(
            (item) => item[fieldName] === fieldValue,
          ),
        );
    })
    .catch((err) => {
      console.log(err);
      CB && CB([]);
    });
};

export const updateFieldInDatabase = async (
  ref,
  docId,
  fieldName,
  fieldValue,
) => {
  await database()
    .ref(ref)
    .child(docId)
    .update({[fieldName]: fieldValue})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
