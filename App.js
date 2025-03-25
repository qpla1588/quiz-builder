import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export default function QuizBuilder() {
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], answerIndex: null }
  ]);

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleAnswerSelect = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].answerIndex = oIndex;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answerIndex: null }]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">문제집 직접 작성 툴</h1>

      {questions.map((q, qIndex) => (
        <Card key={qIndex} className="mb-6">
          <CardContent className="p-4 space-y-4">
            <Textarea
              placeholder={`문제 ${qIndex + 1} 입력...`}
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            />
            {q.options.map((opt, oIndex) => (
              <div key={oIndex} className="flex items-center gap-2">
                <Checkbox
                  checked={q.answerIndex === oIndex}
                  onCheckedChange={() => handleAnswerSelect(qIndex, oIndex)}
                />
                <Input
                  placeholder={`선택지 ${oIndex + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Button onClick={addQuestion}>문제 추가</Button>
    </div>
  );
}
