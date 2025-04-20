
export const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
 
  export const isPastDue = (dateString) => {
    return new Date(dateString) < new Date();
  };

  export const getFileNameFromUrl = (url) => {
    if (!url) return 'No file';

    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    return fileName;
  };

  export const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };