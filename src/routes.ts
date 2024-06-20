import { Router, Request, Response } from 'express';
import fs from 'fs';

interface Submission {
  name: string;
  email: string;
  phone: string;
  githubLink: string;
  stopwatchTime: string;
}

const router = Router();
const dbPath = './src/db.json';

function readSubmissions(): Submission[] {
  const dbContent = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(dbContent) as Submission[];
}

function writeSubmissions(submissions: Submission[]): void {
  fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));
}

router.get('/ping', (req: Request, res: Response) => {
  res.json(true);
});

router.post('/submit', (req: Request, res: Response) => {
  const submission: Submission = req.body;
  const db = readSubmissions();
  db.push(submission);
  writeSubmissions(db);
  res.status(200).send('Submission received');
});

router.get('/read', (req: Request, res: Response) => {
  const db = readSubmissions();
  res.json(db);
});

router.put('/update/:index', (req: Request, res: Response) => {
  const index = parseInt(req.params.index);
  const updatedSubmission: Submission = req.body;
  const db = readSubmissions();

  if (index >= 0 && index < db.length) {
    db[index] = updatedSubmission;
    writeSubmissions(db);
    res.status(200).send('Submission updated');
  } else {
    res.status(404).send('Submission not found');
  }
});

router.delete('/delete/:index', (req: Request, res: Response) => {
  const index = parseInt(req.params.index);
  const db = readSubmissions();

  if (index >= 0 && index < db.length) {
    db.splice(index, 1);
    writeSubmissions(db);
    res.status(200).send('Submission deleted');
  } else {
    res.status(404).send('Submission not found');
  }
});

export { router };
