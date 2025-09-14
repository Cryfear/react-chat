import styles from '../UserPage.module.css';
import React from 'react';
import { Photo } from './Photo/Photo';

export const Photos = () => {
    return (
        <div className={styles.photos}>
            <h4>Favorite Photos</h4>
            <Photo img="https://sun9-26.userapi.com/s/v1/ig2/sERTVT3rf71VqN5tARzpRmcrdXe5AD-jOJNgcreGS9HtY3GPidEjdMLlfRyDb96jdYtwYOx1HtfRCux4NMYy5B-B.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,800x800&from=bu&u=x8YX9ZmbqHmGi1WedM3OyBUkDhjDKVRltkaxdg9y1mA&cs=360x0" />
            <Photo img="https://sun9-35.userapi.com/s/v1/ig2/kJbXoG84Yb7FdiGUyXNmlMs_eqdSkr9cgVWibSEHq-4XYzTMrLDVXIUijvih0Ylyse6tbZklVoRqe99wc2wi8O9g.jpg?quality=96&as=32x45,48x68,72x102,108x153,160x226,240x339,360x509,480x679,540x764,640x905,720x1018,1080x1528,1280x1811,1440x2037,1527x2160&from=bu&u=4B5EeNpdbR_3Y-IWnOK65TGlHYRRYVFZ2lX52lGdZwU&cs=360x0" />
            <Photo img="https://sun9-57.userapi.com/s/v1/ig2/eUpyAeHoQz3yYkuYWt9wOY_vb0MnVaWAqufB9FFT9adEk1f-r5CIhZxPw9-ahY6mAusgKaVEF0RjeqaW8sTefLSA.jpg?quality=95&as=32x40,48x60,72x91,108x136,160x201,240x302,360x453,480x603,540x679,640x805,720x905,875x1100&from=bu&u=96nBAvpWP8t9T5pOryhW2R6zqwyAq3nHnRogbi8GXrg&cs=540x0" />
            <Photo img="https://sun9-79.userapi.com/s/v1/ig2/5QwT7DqZNkAA6OPRKKAzYvEzqDmCvaqp5bghm_76iRwAzhRchV5bVQpwX9jA6mQj04XiruGP5me32dlN6BSr0S_O.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,736x736&from=bu&u=rpg__s1ljQprbvy9yQeGvnibEIcRO1NLEohWrcdf0dM&cs=360x0" />
            <Photo img="https://sun9-67.userapi.com/s/v1/ig2/SAJ_U53GVaV9As6wnlJ30qhyHIqnfM3mDb3xM57D2dgOWQXXDU-0EzWuRF_WhmIqOv-gZ_iHqYkI7xKveNtzVF6-.jpg?quality=96&as=32x43,48x65,72x97,108x146,160x216,240x324,360x486,480x647,540x728,640x863,720x971,949x1280&from=bu&u=6gd3tUBWmmqRlh7SX00C9P0T5omOEaXCwb5PX2FvaOA&cs=540x0" />
            <Photo img="https://sun9-42.userapi.com/s/v1/ig2/p5BuD8m7mh1h9co_l5UriZFiYynlfrFWaZrBJYwe41xtRoWYFEOHHeeK7PhVxbX-WdBUoAaa0PKtfkKsrLpnL47n.jpg?quality=95&as=32x42,48x64,72x95,108x143,160x212,240x318,360x477,480x635,540x715,640x847,720x953,1065x1410&from=bu&u=tfEpH8bfkw1juKzYL488y59ebhLYUNVmMpSgrHUTtGo&cs=360x0" />
        </div>
    )

}