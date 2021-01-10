import React, { useCallback, useEffect, useState, useMemo } from 'react';
import DetailContent from '@/components/detail-content';
import ControlBar from '@/components/control-bar';
import NavBar from '@/components/nav-bar';
// import cls from 'classnames';
import { getSongInfo, getSongUrl } from '@/services';
import { pick } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { setSongInfo } from '@/redux/actions';
import { RootState } from '@/redux/reducers';
import { useAudioPlayer, useAudioPosition } from 'react-use-audio-player';
import styles from './style.module.scss';

export type SongInfoResponse = BaseResponse & { songs?: ResponseSong[] };

export default function Detail() {
  const dispatch = useDispatch();
  const { load, playing, loading, ready, togglePlayPause } = useAudioPlayer();
  const { position, duration, seek } = useAudioPosition({
    highRefreshRate: true,
  });
  const { song } = useSelector((state: RootState) => state.song);
  const [isClickPlay, setIsClickPlay] = useState<boolean>(false);

  const init = useCallback(async () => {
    const songId = 29535531;
    const songInfoJson = (await getSongInfo(songId)) as SongInfoResponse;
    const { data: songUrlData } = await getSongUrl(songId);
    const [songUrl] = songUrlData;
    const [firtSong] = songInfoJson.songs ?? [];
    const targetSongUrl = pick(songUrl, 'url', 'urlSource', 'type', 'md5', 'size');
    dispatch(setSongInfo({ ...targetSongUrl, ...firtSong }));
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (song?.url) {
      load({
        src: song.url,
      });
    }
  }, [load, song?.url]);

  const handlePlay = useCallback(() => {
    setIsClickPlay(true);
    if (ready) {
      togglePlayPause();
      setIsClickPlay(false);
    }
  }, [ready, togglePlayPause]);

  useEffect(() => {
    // loading完成自动继续执行播放
    if (!loading && isClickPlay) {
      handlePlay();
    }
  }, [handlePlay, isClickPlay, loading]);

  const handleSeek = useCallback(
    (value: number) => {
      seek(value);
    },
    [seek]
  );

  const singerName = useMemo(() => song?.ar?.[0]?.name, [song?.ar]);

  const albumStyle = useMemo(() => ({ backgroundImage: `url(${song?.al?.picUrl})` }), [song?.al?.picUrl]);

  return (
    <div className={styles.content}>
      <div className={styles['player-wrapper']}>
        <NavBar songName={song?.name} singer={singerName} className={styles['player__nav-bar']} />
        <DetailContent
          position={position}
          duration={duration}
          isPlay={playing}
          coverImg={song?.al?.picUrl}
          className={styles.player__content}
        />
        <ControlBar
          position={position}
          duration={duration}
          isPlay={playing}
          onSeek={handleSeek}
          onControl={handlePlay}
          isLoading={loading}
          className={styles.player__control}
        />
      </div>
      <div className={styles.mask}>
        <div className={styles.mask__album} style={albumStyle}></div>
        <div className={styles.mask__cover}></div>
      </div>
    </div>
  );
}
