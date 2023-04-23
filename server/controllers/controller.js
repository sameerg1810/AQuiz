import Question from "../models/questionSchema.js";
import Result from "../models/resultSchema.js";
import questions, { answers } from "../database/Data.js";

// this is for posting  questions

export async function getQuestions(req, res) {
  try {
    console.log("inside get");
    const q = await Question.find();
    res.json(q);
  } catch (error) {
    res.json({ questions: "Failed to delete questions from MongoDB" });
  }
}

// this is for inserting questions

export async function insertQuestions(req, res) {
  try {
    await Question.deleteMany(); //deleting all existing documents in the collection
    await Question.insertMany(
      questions.map((q, i) => ({ ...q, answer: answers[i] }))
    );
    res.json({ msg: "Questions and answers inserted into MongoDB" });
  } catch (error) {
    res.json({ questions: "Failed to delete questions from MongoDB" });
  }
}

// this  is for deleting questions

export async function dropQuestions(req, res) {
  try {
    await Question.deleteMany();
    res.json({ msg: "Questions deleted from MongoDB" });
  } catch (error) {
    res.json({ questions: "Failed to delete questions from MongoDB" });
  }
}

// this is for get results

export async function getResult(req, res) {
  try {
    const r = await Result.find();
    res.json(r);
  } catch (error) {
    res.json({ result: "results were not posted", errorMessage: error });
  }
}

export async function storeResult(req, res) {
  console.log(req.body);
  try {
    const { username, result, attempts, points, achieved } = req.body;
    if (!username && !result) throw new Error("Data not provided...!");
    // create a filter for a movie to update
    const filter = { username };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        result,
        points,
        achieved,
      },
      $inc: { attempts: 1 },
    };
    const response = await Result.updateOne(filter, updateDoc, options);

    // Result.create({ username, result, attempts, points, achieved });
    res.json({ msg: "Result stored in MongoDB" });
  } catch (error) {
    console.log(error);
    res.json({ error: "Failed to store result in MongoDB" });
  }
}

// this is for deleting results
//Changed 17-04-2023-----------------------------------------------------------------------//
export async function dropResult(req, res) {
  try {
    const r = await result.deleteMany();
    res.json(r);
  } catch (error) {
    res.json({ result: "results were not deleted successfully" });
  }
}
//added 17-04-2023-----------------------------------------------------------------------//

// this for updating results

export async function updateResult(req, res) {
  try {
    const { id, score } = req.body;
    const r = await result.findOneAndUpdate({ id }, { score }, { new: true });
    res.json(r);
  } catch (error) {
    res.json({ error: "Failed to update result in MongoDB" });
  }
}
