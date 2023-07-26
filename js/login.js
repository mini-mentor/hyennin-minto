// 3-1. 로그인 버튼 이미지
// https://developers.kakao.com/docs/latest/ko/reference/design-guide

const REST_API_KEY = "d2b7a4c136d454a2bc445aa50f1337c0";
const kakaoLoginUrl = "https://kauth.kakao.com/oauth/authorize";
const kakaoTokenApiUrl = "https://kauth.kakao.com/oauth/token"; 
const redirectUrl = "http://localhost:5500/index.html";

// 3-2. 카카오 로그인 창으로 이동
function moveKakaoLogin() {
    location.href = `${kakaoLoginUrl}?client_id=${REST_API_KEY}&redirect_uri=${redirectUrl}&response_type=code`;
}

// 3-3. redirect_url로 이동한 후 url 뒤에 code 값 붙어옴 
document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  if (code) {
    // code 값이 있으면 토큰을 가져옴
    getKakaoToken(code)
      .then((token) => {
        console.log('Kakao 토큰:', token);
        // 이후에 회원 정보 가져오기 등 추가 작업 수행 가능
      })
      .catch((error) => {
        console.error('토큰 요청 실패:', error);
      });
  }
});

// 3-4. 이동된 redirect_url 에서 전달받은 코드 값을 파라미터로 카카오 토큰 요청 API 호출
function getKakaoToken(code) {
		let token = "";
    let data = {
        "grant_type": "authorization_code",
        "client_id": REST_API_KEY,
        "redirect_uri": redirectUrl,
        "code": code,
    };

    $.ajax(kakaoTokenApiUrl, {
        data: data,
        dataType: "json",
        method: "POST",
        async: false,
        success: function (resultData) {
           token = resultData.access_token;
        }
    });

		return token;
}

// 3-5. 회원 정보 가져오기
function getKakaoUserInfo(token) {
    Kakao.Auth.setAccessToken(token);
    Kakao.API.request({
        url: "/v2/user/me",
        success: function (response) {
						// response.id -> 카카오 유니크 아이디
						// 카카오 유니크 아이디로 회원 여부 판단
						// response.kakao_account.profile.nickname -> 이름
						// response.kakao_account.profile.thumbnail_image_url -> 프로필 사진 url
						// response.kakao_account.profile.email -> 이메일
        },
    });
}