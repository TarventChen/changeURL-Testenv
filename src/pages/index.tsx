import { Box, Stack, Typography, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ImageListItem from '@mui/material/ImageListItem';
import Link from '@mui/material/Link';
import Image from 'next/image';
export default function Home() {
  
  const [cameraUrl, setCameraUrl] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [changeSTGFlag, setChangeSTGFlag] = useState(false);
  const [changeDev2Flag, setChangeDev2Flag] = useState(false);

  const transformSTGUrl = (url: string) => {
    const ipMatch = url.match(/http:\/\/([^\/]+)/);
    const installIdMatch = url.match(/installId=([^&]+)/);
    if (ipMatch && installIdMatch) {
      const ip = ipMatch[1];
      const installId = installIdMatch[1];
      const newUrl = `http://${ip}/cgi-bin/adam.cgi?Language=1&methodName=sendDataToAdamApplication&installId=${installId}&s_appDataType=10&s_appData=c3RnLW53Yy5lLWNvbm5lY3RpbmctZnV0dXJlLm5ldA==`;
      return newUrl;
    }
    return url;
  };

  const transformDev2Url = (url: string) => {
    const ipMatch = url.match(/http:\/\/([^\/]+)/);
    const installIdMatch = url.match(/installId=([^&]+)/);
    if (ipMatch && installIdMatch) {
      const ip = ipMatch[1];
      const installId = installIdMatch[1];
      const newUrl = `http://${ip}/cgi-bin/adam.cgi?Language=1&methodName=sendDataToAdamApplication&installId=${installId}&s_appDataType=10&s_appData=ZGV2Mi1ud2MuZS1jb25uZWN0aW5nLWZ1dHVyZS5uZXQ=`;
      return newUrl;
    }
    return url;
  };
  const handleButtonClick_STG = () => {
    const newUrl = transformSTGUrl(cameraUrl);
    const regex = /^http:\/\/[^\/]+\/cgi-bin\/adam.cgi\?Language=1&methodName=sendDataToAdamApplication&installId=[^&]+&s_appDataType=10&s_appData=c3RnLW53Yy5lLWNvbm5lY3RpbmctZnV0dXJlLm5ldA==$/;
    if (!regex.test(newUrl)) {
      alert('カメラのURLを確認してください。');
      return;
    }
    setDestinationUrl(transformSTGUrl(cameraUrl));
    setChangeDev2Flag(false);
    setChangeSTGFlag(true);
  };
  const handleButtonClick_Dev2 = () => {
    const newUrl = transformDev2Url(cameraUrl);
    const regex = /^http:\/\/[^\/]+\/cgi-bin\/adam.cgi\?Language=1&methodName=sendDataToAdamApplication&installId=[^&]+&s_appDataType=10&s_appData=ZGV2Mi1ud2MuZS1jb25uZWN0aW5nLWZ1dHVyZS5uZXQ=$/;
    if (!regex.test(newUrl)) {
      alert('カメラのURLを確認してください。');
      return;
    }
    setDestinationUrl(transformDev2Url(cameraUrl));
    setChangeSTGFlag(false);
    setChangeDev2Flag(true);
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(destinationUrl);
  };

  return (
    <div>
      <Box sx={{width: '90%', textAlign: 'center'}}>
        <Typography variant="h4" sx={{marginTop: 5}}>テスト環境向き先変更</Typography>
        {changeSTGFlag && <Typography variant="h6" sx={{marginTop: 5}}>STG向き先変更しました</Typography>}
        {changeDev2Flag && <Typography variant="h6" sx={{marginTop: 5}}>Dev2向き先変更しました</Typography>}
        <Stack  marginTop={10} spacing={5} direction="row" sx={{alignContent: 'center', justifyContent: 'center'}}>
          <TextField
              id="filled-multiline-static"
              label="カメラ登録URL"
              multiline
              rows={10}
              defaultValue=""
              variant="filled"
              value={cameraUrl}
              onChange={(e) => setCameraUrl(e.target.value)}
            />
          <Stack spacing={2}  direction="column" sx={{alignContent: 'center', justifyContent: 'center'}}>
            <Button variant="contained" onClick={handleButtonClick_STG}>STG</Button>
            <Button variant="contained" onClick={handleButtonClick_Dev2}>Dev2</Button>
          </Stack>
          <TextField
              id="outlined-multiline-static"
              label="向き先URL"
              multiline
              rows={10}
              defaultValue=""
              variant="filled"
              value={destinationUrl}
             />
            
        </Stack>
        {(changeSTGFlag||changeDev2Flag) && <IconButton onClick={handleCopyClick} sx={{left:250, top:-268}}><ContentCopyIcon /></IconButton>}
      </Box>
        <Box sx={{marginTop:10, width:'90%', textAlign: 'center'}}>
          <Typography variant='h5' >手順</Typography>
        </Box>
          <Box sx={{marginTop:5, width:'100%'}}>
          <Stack direction='row' spacing={2} sx={{alignContent: 'center', justifyContent: 'center'}}>
            <Stack spacing={2}  direction="column" >
              <Typography variant='body1'>1. カメラのCameleo登録画面のURLをコピーして貼り付ける</Typography>
              <Typography variant='body1'>2. カメラ登録する(カメラ登録しないとエラーになる)</Typography>
              <Typography variant='body1'>3. 登録したら、生成した向き先を変更する</Typography>
              <Typography variant='body1'>------------------------------------</Typography>
              <Link variant="body2" href="https://panasonic-connect.atlassian.net/wiki/spaces/Cameleo/pages/692421804/AI">{'向き先変更手順'}</Link>
              <Typography variant='body1'>サーバー向き先変更要素</Typography>
              <Typography variant='body1'>・IP Address:カメラの IP Address。（ポートが80以外ならポート番号も必要）</Typography>
              <Typography variant='body1'>・App Install ID: アプリケーションのID</Typography>
              <Typography variant='body1'>・サーバーURL: 設定したいサーバーのURLをBase64 エンコードしたもの</Typography>
            </Stack>
            <Box>
              <Image src="/urlCopyTemp.png" alt="cameleo_url" width="360" height="150" />
            </Box>
            </Stack>
        </Box>
    </div>
  );
}
