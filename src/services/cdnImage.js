const fetchCdnImage = (path) => {
    return `https://seafactory-cdn.s3.amazonaws.com${path}`;
}

export default fetchCdnImage;