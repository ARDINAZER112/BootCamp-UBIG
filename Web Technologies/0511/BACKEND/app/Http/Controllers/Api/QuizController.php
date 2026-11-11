<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LessonContent;
use App\Models\Option;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function check(Request $request)
    {
        $request->validate([
            'option_id' => 'required|integer',
        ]);

        $option = Option::find($request->input('option_id'));
        abort_if(! $option, 404);

        $content = LessonContent::find($request->route('content'));
        abort_if(! $content, 404);

        $lessonId = $request->route('lesson');
        abort_if($lessonId !== null && (int) $lessonId !== (int) $content->lesson_id, 404);

        if ($content->type !== 'quiz') {
            return response()->json([
                'status'  => 'error',
                'message' => 'Only for quiz content',
            ], 400);
        }

        abort_if((int) $option->lesson_content_id !== (int) $content->id, 404);

        return response()->json([
            'status'  => 'success',
            'message' => 'Check answer success',
            'data'    => [
                'question'    => $content->content,
                'user_answer' => $option->option_text,
                'is_correct'  => $option->is_correct,
            ],
        ], 200);
    }
}
