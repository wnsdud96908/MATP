// const kakaoLogout = document.querySelector("#kakaoLogout");

// kakaoLogout.addEventListener("click", async (event) => {
//     const { accessToken } = req.body; // 로그아웃 요청에 필요한 액세스 토큰을 요청 바디에서 받아옵니다.

//     try {
//         const response = await axios.post(
//         'https://kapi.kakao.com/v1/user/logout',
//         {},
//         {
//             headers: {
//             Authorization: `Bearer ${accessToken}`,
//             },
//         }
//         );

//         // 로그아웃 성공
//         console.log(response.data); // 응답 데이터 확인
//         res.status(200).send('로그아웃되었습니다.');
//     } catch (error) {
//         // 로그아웃 실패
//         console.error(error);
//         res.status(500).send('로그아웃에 실패했습니다.');
//     }
// })