<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompletedLesson;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Lesson;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /** E1 - Daftar ke kursus (user). */
    public function registerCourse(Request $request, string $slug)
    {
        $course = Course::where('slug', $slug)->where('is_published', 1)->firstOrFail();
        $user = $request->user();

        $already = Enrollment::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->exists();

        if ($already) {
            return response()->json([
                'status'  => 'error',
                'message' => 'The user is already registered for this course',
            ], 400);
        }

        Enrollment::create(['user_id' => $user->id, 'course_id' => $course->id]);

        return response()->json([
            'status'  => 'success',
            'message' => 'User registered successful',
        ], 201);
    }

    /** E2 - Kursus yang diikuti beserta lesson yang sudah selesai. */
    public function progress(Request $request)
    {
        $userId = $request->user()->id;

        $courseIds = Enrollment::where('user_id', $userId)->orderBy('id')->pluck('course_id');
        $completedIds = CompletedLesson::where('user_id', $userId)->pluck('lesson_id');

        $progress = Course::whereIn('id', $courseIds)->orderBy('id')->get()->map(function ($course) use ($completedIds) {
            $lessons = Lesson::select('lessons.id', 'lessons.name', 'lessons.order')
                ->join('sets', 'sets.id', '=', 'lessons.set_id')
                ->where('sets.course_id', $course->id)
                ->whereIn('lessons.id', $completedIds)
                ->orderBy('sets.order')
                ->orderBy('lessons.order')
                ->get();

            return [
                'course'            => $course,
                'completed_lessons' => $lessons,
            ];
        })->values();

        return response()->json([
            'status'  => 'success',
            'message' => 'User progress retrieved successfully',
            'data'    => ['progress' => $progress],
        ], 200);
    }
}
