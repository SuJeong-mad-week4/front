import {
  PauseCircleFilled,
  PlayCircleFilled,
  SmileOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Flex,
  Input,
  Modal,
  Progress,
  Typography,
} from "antd";
import axios from "axios";
import * as faceapi from "face-api.js";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Webcam from "react-webcam";
import { UserContext } from "../App";
import "./PetCare.css";

const { Text } = Typography;

const PetCare = () => {
  const [growthStage, setGrowthStage] = useState(0);
  const [exp, setExp] = useState(0);
  const [petData, setPetData] = useState({});
  const [petName, setPetName] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [collectedPets, setCollectedPets] = useState([]);
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [randomMessage, setRandomMessage] = useState("");
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [actionCanceled, setActionCanceled] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [albumStates, setAlbumStates] = useState([false, false, false]);
  const [albumRecommendations, setAlbumRecommendations] = useState([
    { name: "Album1", url: "https://youtu.be/zsySLgXlfx4?feature=shared" },
    { name: "Album2", url: "https://youtu.be/85km0nIrCGs?feature=shared" },
    { name: "Album3", url: "https://youtu.be/MjXeOAouF3w?feature=shared" },
  ]);
  const [stretchingVideo, setStretchingVideo] = useState(null);
  const [showStretchingModal, setShowStretchingModal] = useState(false);
  const [loadedSeconds, setLoadedSeconds] = useState(0);
  const [isHappyModalVisible, setIsHappyModalVisible] = useState(false);
  const [isHappy, setIsHappy] = useState(false);

  const handlePositiveMessage = () => {
    const positiveMessages = [
      "행복하자!",
      "멋져요!",
      "좋아요!",
      "너가 최고야!",
      "잘하고 있어요!",
    ];
    const randomIndex = Math.floor(Math.random() * positiveMessages.length);
    setRandomMessage(positiveMessages[randomIndex]);
    setShowSpeechBubble(true);

    setTimeout(() => {
      setShowSpeechBubble(false);
      setRandomMessage("");
    }, 2000);
  };

  const [videoDimensions, setVideoDimensions] = useState({
    width: "100%",
    height: "200px",
  });

  const handleAlbumClick = (url, index) => {
    if (currentSong === url) {
      // If the clicked album is the same as the current song, toggle play/pause
      setPlaying((prevPlaying) => !prevPlaying);
    } else {
      // If a different album is clicked, start playing the new song
      setCurrentSong(url);
      setPlaying(true);
    }
    setVideoDimensions({ width: "50%", height: "300px" });
    const newAlbumStates = albumStates.map((state, i) =>
      i === index ? !state : false
    );
    setAlbumStates(newAlbumStates);
    setVideoDimensions({ width: "50%", height: "300px" });

    // Reset played seconds and duration when a new album is clicked
    setPlayedSeconds({});
    setDuration({});
  };

  const handleCancelAction = () => {
    setActionCanceled(true);
    setShowMusicModal(false);
    setCurrentSong(null);
  };
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await axios.get(
          `http://143.248.196.70:8080/pet/gets?userId=${user.id}`
        );
        setCollectedPets(response.data);
      } catch (error) {
        console.error("Error fetching user collection:", error);
      }
    };

    // 유저 정보를 서버에서 가져오는 함수
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://143.248.196.70:8080/pet/get?petId=${user.currentPet}`
        );
        setPetData(response.data);
        setExp(response.data.exp);
        setGrowthStage(calculateGrowthStage(response.data.exp));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    // 로그인 상태에서만 유저 정보를 가져옴
    if (user) {
      fetchUserData();
      fetchCollection();
    }
  }, [exp, user]);

  const createPet = async () => {
    try {
      const response = await axios.post(
        "http://143.248.196.70:8080/pet/create",
        {
          userId: user.id,
          nickname: petName,
        }
      );
      const createdPetId = response.data.id;
      setUser((prevUser) => ({
        ...prevUser,
        currentPet: createdPetId,
      }));
    } catch (error) {
      console.error("Error creating pet:", error);
    }
  };

  const handleActivity = async (growthAmount) => {
    const newExp = exp + growthAmount;

    try {
      const response = await axios.post("http://143.248.196.70:8080/pet/grow", {
        loginId: user.id,
        petId: user.currentPet,
        exp: growthAmount,
      });
      setPetData(response.data);
      setExp(response.data.exp);
      setGrowthStage(calculateGrowthStage(response.data.exp));
      if (response.data.exp >= 100) {
        setShowCollectModal(true);
      }
    } catch (error) {
      console.error("Error updating growth activity:", error);
    }
  };

  const handleHappyCancel = () => {
    stopWebcam();
    setIsHappyModalVisible(false);
  };

  const stopWebcam = () => {
    // Webcam을 정지시키는 코드
    if (webcamRef.current) {
      const webcam = webcamRef.current.video;
      const stream = webcam.srcObject;

      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        webcam.srcObject = null;
      }
    }
  };

  const handleMusicModalComplete = () => {
    // Check if the video has ended before allowing completion
    if (!actionCanceled && videoEnded) {
      handleActivity(2);
      setPlaying(false);
      setShowMusicModal(false);
      setCurrentSong(null);
      setAlbumStates([false, false, false]);
    } else if (!videoEnded && !actionCanceled) {
      alert("노래가 다 끝난 후에 완료하기 버튼을 누를 수 있습니다.");
    }

    setPlayedSeconds({});
    setDuration({});
  };

  const handleCollect = async () => {
    try {
      const response = await axios.post("http://143.248.196.70:8080/pet/save", {
        userId: user.id,
      });

      await setUser((prevUser) => ({
        ...prevUser,
        currentPet: null,
      }));

      setShowCollectModal(false);
    } catch (error) {
      console.error("Error collecting pet:", error);
      // Handle error if needed
    }
  };

  const handleCancelCollect = () => {
    setShowCollectModal(false);
    // You might want to perform additional actions when canceling the collection
  };

  const handleStretchingActivity = () => {
    // Set the YouTube video link for stretching
    setStretchingVideo("https://youtu.be/nExNLE57EvI?feature=shared");
    setShowStretchingModal(true);
  };

  const handleStretchingModalComplete = () => {
    // Check if the video has ended before allowing completion
    if (videoEnded) {
      handleActivity(3); // Adjust the EXP increase as needed
      setShowStretchingModal(false);
      setStretchingVideo(null);
    } else {
      alert("영상이 다 끝난 후에 완료하기 버튼을 누를 수 있습니다.");
    }
  };

  const calculateGrowthStage = (currentExp) => {
    if (currentExp < 10) {
      return 0;
    } else if (currentExp < 20) {
      return 10;
    } else if (currentExp < 40) {
      return 20;
    } else if (currentExp < 70) {
      return 40;
    } else if (currentExp < 100) {
      return 70;
    } else {
      return 100;
    }
  };

  const getGrowthImage = (type) => {
    switch (growthStage) {
      case 0:
        return `./images/egg${type}.png`;
      case 10:
        return `./images/baby${type}.png`;
      case 20:
        return `./images/teen${type}.png`;
      case 40:
        return `./images/young_adult${type}.png`;
      case 70:
        return `./images/adult${type}.png`;
      default:
        return `./images/final${type}.png`;
    }
  };

  // 웹캠 도전
  const webcamRef = useRef(null);

  const startWebcam = async () => {
    try {
      if (webcamRef.current) {
        const webcam = webcamRef.current.videoStream.getVideoTracks()[0];
        const constraints = { video: true };
        await navigator.mediaDevices.getUserMedia(constraints);
        webcam.srcObject = await navigator.mediaDevices.getUserMedia(
          constraints
        );
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  useEffect(() => {
    const loadModels = async () => {
      // Load face-api.js models
      try {
        await faceapi.nets.ssdMobilenetv1.load("/models");
        await faceapi.loadFaceExpressionModel("/models");
        await faceapi.loadFaceLandmarkModel("/models");
      } catch (error) {
        console.error("Error loading models:", error);
        return;
      }
    };
    loadModels();
  }, []);

  const detectFace = async () => {
    console.log("detect face");
    if (webcamRef.current) {
      console.log("ㅋㅋ");
      const videoEl = webcamRef.current.video;

      // Perform face detection
      const minConfidenceFace = 0.5;
      const detectionOptions = new faceapi.SsdMobilenetv1Options({
        minConfidenceFace,
      });

      const expressionResult = await faceapi
        .detectSingleFace(videoEl, detectionOptions)
        .withFaceExpressions();
      const landmarkResult = await faceapi
        .detectSingleFace(videoEl, detectionOptions)
        .withFaceLandmarks();

      // Process results
      if (expressionResult && landmarkResult) {
        const expressionFiltered = Object.fromEntries(
          Object.entries(expressionResult.expressions)
            .filter(([key, score]) => score > minConfidenceFace)
            .sort((a, b) => b[1] - a[1])
        );

        if (expressionFiltered.happy) {
          console.log(expressionFiltered);
          setIsHappy(true);
        }
      }
    }
  };

  const doneHappy = () => {
    setIsHappy(false);
    handleActivity(5);
    setIsHappyModalVisible(false);
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, rgba(255, 159, 159, 0.8), rgba(255, 237, 191, 0.8) 100%)",
        height: "93vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          width: 700,
          height: 200,
          background: "rgba(255, 255, 255, 0.6)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          position: "absolute",
          border: "none",
          textAlign: "center",
          marginTop: "-540px",
          padding: 10,
        }}
      >
        <p style={{ marginTop: "-15px", zIndex: "+1", fontSize: "15px" }}>
          My Pet
        </p>
        <Flex>
          {/* Map through your collectedPets array and display each pet */}
          {collectedPets.map((pet) => {
            if (pet.id === user.currentPet) {
              return null;
            } else {
              return (
                <Flex vertical>
                  <img
                    key={pet.id}
                    src={`/images/final${pet.type}.png`} // Replace with the actual URL
                    alt={`Pet ${pet.type}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />
                  <p style={{ marginTop: "0px", color: "#ff9f9f" }}>
                    {pet.nickname}
                  </p>
                </Flex>
              );
            }
          })}
        </Flex>
      </Card>
      <Card
        style={{
          width: 700,
          height: 500,
          background: "rgba(255, 255, 255, 0.6)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          position: "absolute",
          border: "none",
          textAlign: "center",
          marginTop: "190px",
        }}
      >
        {user && user.currentPet ? (
          <>
            <div
              style={{
                position: "absolute",
                left: "5px",
                top: "5px",
                cursor: "pointer",
              }}
            ></div>
            <p
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {user ? `${user.nickname}의 펫` : "펫"}
            </p>

            <img
              src={getGrowthImage(petData.type)}
              alt="Pet"
              style={{ width: 260, height: 260 }}
            />
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              <Progress
                percent={Number(((exp / 100) * 100).toFixed())}
                status="active"
                strokeColor={{ from: "#ffc839", to: "#ff6666" }}
                style={{ width: "400px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <Button
                type="primary"
                onClick={() => setShowMusicModal(true)}
                style={{
                  color: "white",
                  background: "#ff9f9f",
                  fontWeight: "bold",
                  borderRadius: "20px",
                }}
              >
                <SmileOutlined /> 노래 듣기 +2
              </Button>
              <Button
                type="primary"
                style={{
                  marginLeft: "5px",
                  color: "white",
                  background: "#ff9f9f",
                  fontWeight: "bold",
                  borderRadius: "20px",
                }}
                onClick={() => setIsHappyModalVisible(true)}
              >
                <SmileOutlined /> 웃음 +5
              </Button>
              <Modal
                title=" SMILEY :D !"
                visible={isHappyModalVisible}
                onCancel={handleHappyCancel}
                footer={null}
              >
                <Divider />
                <Flex vertical gap={10}>
                  <Flex gap={10}>
                    {!isHappy ? (
                      <Button
                        style={{
                          color: "white",
                          background: "#ff9f9f",
                        }}
                        shape="round"
                        onClick={detectFace}
                      >
                        웃음 인식하기
                      </Button>
                    ) : (
                      <Button
                        disabled
                        style={{
                          color: "white",
                          background: "#ff9f9f",
                        }}
                        shape="round"
                        onClick={detectFace}
                      >
                        웃음 인식하기
                      </Button>
                    )}
                  </Flex>
                  <Webcam
                    style={{ borderRadius: 10, transform: "scaleX(-1)" }}
                    ref={webcamRef}
                  />
                  <Text style={{ textAlign: "center" }}>
                    {!isHappy
                      ? "활짝 웃은 뒤, '웃음 인식하기' 버튼을 눌러주세요!"
                      : "웃음이 보기 좋아요!"}
                  </Text>
                  {!isHappy ? (
                    <Button
                      disabled
                      type="primary"
                      onClick={doneHappy}
                      style={{
                        color: "white",
                        background: "#ff9f9f",
                        borderRadius: "20px",
                        marginTop: "20px",
                        marginLeft: "10px",
                      }}
                    >
                      완료하기
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={doneHappy}
                      style={{
                        color: "white",
                        background: "#ff9f9f",
                        borderRadius: "20px",
                        marginTop: "20px",
                        marginLeft: "10px",
                      }}
                    >
                      완료하기
                    </Button>
                  )}
                </Flex>
              </Modal>
              <Button
                type="primary"
                style={{
                  marginLeft: "5px",
                  color: "white",
                  background: "#ff9f9f",
                  fontWeight: "bold",
                  borderRadius: "20px",
                }}
                onClick={() => {
                  handleActivity(1);
                  handlePositiveMessage();
                }}
              >
                <SmileOutlined /> 긍정적 말 듣기 +1
              </Button>
              {showSpeechBubble && randomMessage && (
                <div
                  style={{
                    position: "absolute",
                    right: "100px",
                    top: "80px",
                    width: "120px",
                    height: "120px",
                    background: "url('./images/chat2.png')",
                    backgroundSize: "cover",
                    padding: "10px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "speechBubbleFadeIn 0.5s ease-out",
                  }}
                >
                  {randomMessage}
                </div>
              )}
              <Button
                type="primary"
                style={{
                  marginLeft: "5px",
                  color: "white",
                  background: "#ff9f9f",
                  fontWeight: "bold",
                  borderRadius: "20px",
                }}
                onClick={handleStretchingActivity}
              >
                <SmileOutlined /> 스트레칭 +4
              </Button>
              {stretchingVideo && (
                <Modal
                  open={showStretchingModal}
                  onCancel={() => setShowStretchingModal(false)}
                  width={800}
                  height={800}
                  footer={null}
                >
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "20px" }}>
                      마음이 편해지는 힐링 요가 해보세요 :)
                    </p>
                    {/* Render YouTube video for stretching */}
                    <ReactPlayer
                      url={stretchingVideo}
                      playing={playing}
                      controls
                      width="640px"
                      height="360px"
                      onEnded={() => setVideoEnded(true)}
                      onPause={() => setVideoEnded(false)}
                      style={{ marginLeft: "50px" }}
                      // Add other props as needed
                    />
                    <Button
                      type="primary"
                      onClick={handleStretchingModalComplete}
                      style={{
                        marginTop: "20px",
                        color: "white",
                        background: "#ff9f9f",
                        borderRadius: "20px",
                      }}
                    >
                      완료하기
                    </Button>
                    <Button
                      onClick={() => {
                        setShowStretchingModal(false);
                        setVideoEnded(false);
                        setPlaying(false);
                      }}
                      style={{
                        marginTop: "20px",
                        marginLeft: "10px",
                        borderRadius: "20px",
                      }}
                    >
                      취소하기
                    </Button>
                  </div>
                </Modal>
              )}
            </div>
            <div style={{ marginTop: "20px" }}></div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "20px", marginTop: "-5px" }}>
              새로운 펫을 만나보세요 !
            </p>
            <img width={235} src="./images/questionmark.png" />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Input
                type="text"
                placeholder="펫 이름"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                style={{
                  width: "300px",
                  marginTop: "20px",
                  textAlign: "center",
                  borderRadius: "20px",
                }}
              />
              <Button
                style={{
                  marginTop: "20px",
                  marginLeft: "10px",
                  color: "white",
                  background: "#ff9f9f",
                  borderRadius: "20px",
                }}
                onClick={() => createPet()}
              >
                결정
              </Button>
            </div>
          </div>
        )}
      </Card>
      {showCollectModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            style={{
              width: 400,
              padding: 20,
              textAlign: "center",
              background: "white",
            }}
          >
            <p>{`' ${petData.nickname} '펫을 컬렉션에 저장하시겠습니까?`}</p>
            <img
              src={`/images/final${petData.type}.png`}
              style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
            />
            <Button
              type="primary"
              onClick={handleCollect}
              style={{
                color: "white",
                background: "#ff9f9f",
                borderRadius: "20px",
              }}
            >
              저장하기
            </Button>
            <Button
              onClick={handleCancelCollect}
              style={{
                color: "white",
                background: "#ff9f9f",
                borderRadius: "20px",
                marginLeft: "10px",
              }}
            >
              취소
            </Button>
          </Card>
        </div>
      )}
      {showMusicModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            style={{
              width: 900,
              padding: 20,
              textAlign: "center",
              background: "white",
              borderRadius: "20px",
            }}
          >
            <p style={{ fontSize: "20px" }}>이 노래를 들어보세요 !</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {albumRecommendations.map((album, index) => (
                <div
                  key={index}
                  style={{ position: "relative", marginBottom: "20px" }}
                  onClick={() => handleAlbumClick(album.url, index)}
                >
                  <img
                    src={`./images/${album.name}.png`}
                    alt={`Album${index + 1}`}
                    style={{
                      width: "240px",
                      height: "240px",
                      cursor: "pointer",
                      borderRadius: "20px",
                      boxShadow: "0 4px 8px",
                      filter: albumStates[index]
                        ? "brightness(60%)"
                        : "brightness(100%)",
                    }}
                  />

                  {albumStates[index] && (
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "10px",
                        backgroundColor: "#ccc",
                        bottom: "0",
                        left: "0",
                        borderRadius: "0 0 20px 20px",
                      }}
                    >
                      <div
                        style={{
                          width: `${
                            (playedSeconds[index] / duration[index]) * 100
                          }%`, // 재생 상태에 따라 조절할 부분
                          height: "90%",
                          backgroundColor: "#ff9f9f",
                          borderRadius: "20px",
                        }}
                      ></div>
                    </div>
                  )}

                  {albumStates[index] ? (
                    <PauseCircleFilled
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontSize: "48px",
                      }}
                    />
                  ) : (
                    <PlayCircleFilled
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontSize: "48px",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <Button
              type="primary"
              onClick={handleCancelAction}
              style={{
                color: "white",
                background: "#ff9f9f",
                borderRadius: "20px",
                marginTop: "20px",
              }}
            >
              취소하기
            </Button>
            <Button
              type="primary"
              onClick={handleMusicModalComplete}
              style={{
                color: "white",
                background: "#ff9f9f",
                borderRadius: "20px",
                marginTop: "20px",
                marginLeft: "10px",
              }}
            >
              완료하기
            </Button>
          </Card>
        </div>
      )}
      {currentSong && (
        <ReactPlayer
          url={currentSong}
          playing={playing}
          controls
          width={videoDimensions.width}
          height={videoDimensions.height}
          onDuration={(duration) => {
            setDuration(duration);
          }}
          onEnded={() => {
            setVideoEnded(true);
            setPlaying(false);
          }}
          onPause={(state) => {
            // Find the index of the currently playing album
            const currentIndex = albumStates.findIndex((state) => state);
            if (currentIndex !== -1) {
              setPlayedSeconds((prev) => ({
                ...prev,
                [currentIndex]: state.playedSeconds,
              }));
              setDuration((prev) => ({
                ...prev,
                [currentIndex]: state.loadedSeconds,
              }));
            }
            setVideoEnded(false);
          }}
          onProgress={(state) => {
            console.log(state.playedSeconds);
            const currentIndex = albumStates.findIndex((state) => state);
            if (currentIndex !== -1) {
              setPlayedSeconds((prev) => ({
                ...prev,
                [currentIndex]: state.playedSeconds,
              }));
              setDuration((prev) => ({
                ...prev,
                [currentIndex]: state.loadedSeconds,
              }));
            }
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: -1,
          }}
        />
      )}
    </div>
  );
};

export default PetCare;
