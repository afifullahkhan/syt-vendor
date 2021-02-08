import {PermissionsAndroid} from 'react-native';
export async function requestStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'SYT app',
        message: 'SYT App want to  access to your storage ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      alert('You can use the location');
    } else {
      console.log('location permission denied');
      alert('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
export const convertToArray = (data) => {
  let array = [];
  data.map((r) => {
    array.push({...r.data(), id: r.id});
  });
  return array;
};
export const MappedElement = ({data, renderElement}) => {
  if (data && data.length) {
    return data.map((obj, index, array) => renderElement(obj, index, array));
  }
  return null;
};
export const convertDBSnapshoptToArrayOfObject = (snapshot) => {
  let arr = [];
  Object.entries(snapshot.val()).forEach((it) => {
    arr.push({id: it[0], ...it[1]});
  });
  return arr;
};

export const getRemainingTime = (deliverDateTime) => {
  let startTime = new Date();
  let endTime = new Date(deliverDateTime);
  let difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
  let num = Math.round(difference / 60000);
  let hours = num / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  if (rhours !== 0) {
    return rhours + 'H ' + rminutes + ' Min left';
  } else {
    return rminutes + ' Min left';
  }
};
