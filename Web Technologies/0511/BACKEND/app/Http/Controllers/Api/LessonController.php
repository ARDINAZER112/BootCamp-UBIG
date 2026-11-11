<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompletedLesson;
use App\Models\Lesson;
use App\Models\LessonContent;
use App\Models\Option;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LessonController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'                                => 'required|string|max:255',
            'set_id'                              => 'required|integer|exists:sets,id',
            'contents'                            => 'nullable|array',
            'contents.*.type'                     => 'required|in:learn,quiz',
            'contents.*.content'                  => 'required|string',
            'contents.*.options'                  => 'nullable|array',
            'contents.*.options.*.option_text'    => 'required|string',
            'contents.*.options.*.is_correct'     => 'required|boolean',
        ]);

        $lesson = DB::transaction(function () use ($data) {
            $order = (Lesson::where('set_id', $data['set_id'])->max('order') ?? -1) + 1;

            $lesson = Lesson::create([
                'set_id' => $data['set_id'],
                'name'   => $data['name'],
                'order'  => $order,
            ]);

            foreach (array_values($data['contents'] ?? []) as $index => $item) {
                $content = LessonContent::create([
                    'lesson_id' => $lesson->id,
                    'type'      => $item['type'],
                    'content'   => $item['content'],
                    'order'     => $index,
                ]);

                if ($item['type'] === 'quiz') {
                    foreach ($item['options'] ?? [] as $option) {
                        Option::create([
                            'lesson_content_id' => $content->id,
                            'option_text'       => $option['option_text'],
                            'is_correct'        => filter_var($option['is_correct'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0,
                        ]);
                    }
                }
            }

            return $lesson;
        });

        return response()->json([
            'status'  => 'success',
            'message' => 'Lesson successfully added',
            'data'    => [
                'name'  => $lesson->name,
                'order' => $lesson->order,
                'id'    => $lesson->id,
            ],
        ], 201);
    }

    public function destroy($id)
    {
        Lesson::findOrFail($id)->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Lesson successfully deleted',
        ], 200);
    }

    public function complete(Request $request, $id)
    {
        $lesson = Lesson::findOrFail($id);

        CompletedLesson::firstOrCreate([
            'user_id'   => $request->user()->id,
            'lesson_id' => $lesson->id,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Lesson successfully completed',
        ], 200);
    }
}
