<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Administrator;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'slug'        => 'required|string|max:255|unique:courses,slug',
        ]);

        $course = Course::create($data + ['is_published' => 0]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Course successfully added',
            'data'    => [
                'name'        => $course->name,
                'slug'        => $course->slug,
                'description' => $course->description,
                'updated_at'  => $course->updated_at,
                'created_at'  => $course->created_at,
                'id'          => $course->id,
            ],
        ], 201);
    }

    public function update(Request $request, string $slug)
    {
        $course = Course::where('slug', $slug)->firstOrFail();

        $data = $request->validate([
            'name'         => 'required|string|max:255',
            'description'  => 'nullable|string',
            'is_published' => 'nullable|boolean',
        ]);

        $course->name = $data['name'];

        if ($request->has('description')) {
            $course->description = $data['description'];
        }

        if ($request->filled('is_published')) {
            $course->is_published = $request->boolean('is_published') ? 1 : 0;
        }

        $course->save();

        return response()->json([
            'status'  => 'success',
            'message' => 'Course successfully updated',
            'data'    => [
                'id'           => $course->id,
                'name'         => $course->name,
                'slug'         => $course->slug,
                'description'  => $course->description,
                'is_published' => (bool) $course->is_published,
                'created_at'   => $course->created_at,
                'updated_at'   => $course->updated_at,
            ],
        ], 200);
    }

    public function destroy(string $slug)
    {
        Course::where('slug', $slug)->firstOrFail()->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Course successfully deleted',
        ], 200);
    }

    public function index()
    {
        $courses = Course::where('is_published', 1)->orderBy('id')->get();

        return response()->json([
            'status'  => 'success',
            'message' => 'Courses retrieved successfully',
            'data'    => ['courses' => $courses],
        ], 200);
    }

    public function show(Request $request, string $slug)
    {
        $query = Course::where('slug', $slug);

        if (! ($request->user() instanceof Administrator)) {
            $query->where('is_published', 1);
        }

        $course = $query->with([
            'sets'                           => fn ($q) => $q->orderBy('order')->orderBy('id'),
            'sets.lessons'                   => fn ($q) => $q->orderBy('order')->orderBy('id'),
            'sets.lessons.contents'          => fn ($q) => $q->orderBy('order')->orderBy('id'),
            'sets.lessons.contents.options'  => fn ($q) => $q->orderBy('id'),
        ])->firstOrFail();

        $sets = $course->sets->map(fn ($set) => [
            'id'      => $set->id,
            'name'    => $set->name,
            'order'   => $set->order,
            'lessons' => $set->lessons->map(fn ($lesson) => [
                'id'       => $lesson->id,
                'name'     => $lesson->name,
                'order'    => $lesson->order,
                'contents' => $lesson->contents->map(function ($content) {
                    $item = [
                        'id'      => $content->id,
                        'type'    => $content->type,
                        'content' => $content->content,
                        'order'   => $content->order,
                    ];

                    if ($content->type === 'quiz') {
                        $item['options'] = $content->options->map(fn ($o) => [
                            'id'          => $o->id,
                            'option_text' => $o->option_text,
                        ])->values();
                    }

                    return $item;
                })->values(),
            ])->values(),
        ])->values();

        return response()->json([
            'status'  => 'success',
            'message' => 'Course details retrieved successfully',
            'data'    => [
                'id'           => $course->id,
                'name'         => $course->name,
                'slug'         => $course->slug,
                'description'  => $course->description,
                'is_published' => $course->is_published,
                'created_at'   => $course->created_at,
                'updated_at'   => $course->updated_at,
                'sets'         => $sets,
            ],
        ], 200);
    }
}
