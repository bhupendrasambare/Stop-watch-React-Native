export const pickerSelectStyles = {
    inputIOS: {
      fontSize:40,
      paddingVertical: 10,
      paddingHorizontal: 10,
      color: 'white',
      fontWeight:"bold",
      maginRight:20,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      color: 'black',
      paddingRight: 30,
    },
};

export const minutes = Array.from({ length: 61 }, (_, index) => index);

export const seconds = Array.from({ length: 61 }, (_, index) => index);

export const hours = Array.from({ length: 24 }, (_, index) => index);

export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours > 0 ? hours + ':' : ''}${minutes > 0 ? minutes + ':' : ''}${remainingSeconds}`;
};