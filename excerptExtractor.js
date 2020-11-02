const fs = require("fs");
fs.readFile("excerpt.txt", (err, data) => {
  if (err) throw err;

  var excerpt = data.toString();

  function assignment(excerpt, word) {
    var wordsOcurrences = 0;
    var wordsMatchingSen = [];
    var finalSentences = [];
    // finding the word in sentences and sentences match
    var provisonalSentence = excerpt.toLowerCase();
    var punctuationless = provisonalSentence.replace(
      /[,\/#!$%\^&\*;:{}=\-_`~()]/g,
      ""
    );
    var finalString = punctuationless.replace(/\s{2,}/g, " ");
    var sentence = finalString.split(".");
    var sentenceList = [];
    for (let i = 0; i < sentence.length; i++) {
      sentenceList.push(sentence[i].split(/[" " "]/));
    }

    for (let i = 0; i < sentenceList.length; i++) {
      for (let j = 0; j < sentenceList[i].length; j++) {
        if (sentenceList[i][j] === word.toLowerCase()) {
          wordsOcurrences = wordsOcurrences + 1;
          wordsMatchingSen.push(sentenceList[i]);
        }
      }
    }

    for (let i = 0; i < wordsMatchingSen.length; i++) {
      finalSentences.push(wordsMatchingSen[i].join(" "));
    }
    // finding the word in conversations
    var originalConversationArray = [];
    var conversation = [];
    var conversationMatch = [];
    var finalConversation = [];
    var conversationCount = 0;
    var tempArray = excerpt.toLowerCase().split("\r\n");

    var conversationList = [];
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].match(/"(.*?)"/g))
        originalConversationArray.push(tempArray[i].match(/"(.*?)"/g));
    }
    for (let i = 0; i < originalConversationArray.length; i++) {
      for (let j = 0; j < originalConversationArray[i].length; j++) {
        conversationList.push(originalConversationArray[i][j].split('"'));
      }
    }
    for (let i = 0; i < conversationList.length; i++) {
      for (let j = 0; j < conversationList[i].length; j++) {
        conversation.push(conversationList[i][j].split(" "));
      }
    }
    for (let i = 0; i < conversation.length; i++) {
      for (let j = 0; j < conversation[i].length; j++) {
        if (conversation[i][j] === word.toLowerCase()) {
          conversationCount = conversationCount + 1;
          conversationMatch.push(conversation[i]);
        }
      }
    }

    for (let i = 0; i < conversationMatch.length; i++) {
      finalConversation.push(conversationMatch[i].join(" "));
    }
    console.log("Word Count in Excerpt: ", wordsOcurrences);

    console.log("> List all sentences in which the word appears:");

    for (let i = 0; i < finalSentences.length; i++) {
      console.log(" ", i + 1, finalSentences[i].trim());
    }
    if (conversationCount === 0) {
      console.log("> Is the word mentioned in a conversation? NO");
    } else {
      console.log("> Is the word mentioned in a conversation? Yes");
    }
    console.log(
      "> Number of times word mention in conversations:",
      conversationCount
    );

    if (finalConversation.length !== 0) {
      for (let i = 0; i < finalConversation.length; i++) {
        console.log("> Conversations which consists these words:");
        console.log(" ", i + 1, finalConversation[i]);
      }
    } else {
      console.log("> Conversations which consists these words:", 0);
    }

    console.log("> List of all conversations in the Excerpt:");
    for (let i = 0; i < originalConversationArray.length; i++) {
      for (let j = 0; j < originalConversationArray[i].length; j++) {
        console.log(
          " ",
          "->",
          originalConversationArray[i][j].replace(/("|`|,)/g, "")
        );
      }
    }
  }
  var content = data.toString();
  //Finding Nouns
  function getProperNouns(content) {
    // Grab anything that looks like a proper noun
    // Remove first two characters of every match
    // Remove any items that contain a new line
    // Convert to Set (removes duplicates) and back to Array
    // Sort alphabetically
    const items = Array.from(
      new Set(
        (
          content.match(
            // !! Adds 2 characters to start of matches for some reason
            /(?:[^.\s!?])\s+((?:[A-Z][-A-Za-z']*(?: *[A-Z][-A-Za-z']*)*))|(?:[^.\s!?])\s+([A-Z][-A-Za-z']*)/gm
          ) || []
        )
          .map((item) => item.substr(2))
          .filter((item) => !/\n/.test(item))
      )
    ).sort();
    console.log("> All Pronouns:");
    for (let i = 0; i < items.length; i++) {
      console.log("", i + 1, items[i]);
    }
  }

  console.log(assignment(excerpt, "harry"));
  getProperNouns(content);
});
