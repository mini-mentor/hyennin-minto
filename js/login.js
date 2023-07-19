Kakao.init('857c1132de8ba52771f695ef6e8b3f57');

function loginWithKakao() {
  Kakao.Auth.authorize({
    redirectUri: 'http://127.0.0.1:5500/signup.html',
  });
}