Webcam.set({
  width: 350,
  height: 300,
  image_format: "png",
  png_quality: 90,
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot() {
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML =
      "<img id='capture' src='" + data_uri + "'/>";
  });
}

console.log("ml5 version: " + ml5.version);

classifier = ml5.imageClassifier(
  "https://teachablemachine.withgoogle.com/models/0uSuuG-NV/model.json",
  model_loaded
);

function model_loaded() {
  console.log("Model loaded.");
}

function identify() {
  capture = document.getElementById("capture");
  classifier.classify(capture, got_result);
}

function got_result(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("result_emotion_1").innerHTML = results[0].label;
    document.getElementById("result_emotion_2").innerHTML = results[1].label;

    if (results[0].label == "Happy") {
      document.getElementById("update_emoji_1").innerHTML = "&#128522;";
    }
    if (results[0].label == "Sad") {
      document.getElementById("update_emoji_1").innerHTML = "&#128532;";
    }
    if (results[0].label == "Angry") {
      document.getElementById("update_emoji_1").innerHTML = "&#128545;";
    }

    if (results[1].label == "Happy") {
      document.getElementById("update_emoji_2").innerHTML = "&#128522;";
    }
    if (results[1].label == "Sad") {
      document.getElementById("update_emoji_2").innerHTML = "&#128532;";
    }
    if (results[1].label == "Angry") {
      document.getElementById("update_emoji_2").innerHTML = "&#128545;";
    }
  }
}
