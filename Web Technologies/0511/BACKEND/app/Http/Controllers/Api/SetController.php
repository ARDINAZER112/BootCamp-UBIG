<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseSet;
use Illuminate\Http\Request;

class SetController extends Controller
{
    /** C1 - Add set (admin). Order otomatis bertambah. */
    public function store(Request $request, string $slug)
    {
        $course = Course::where('slug', $slug)->firstOrFail();

        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $order = ($course->sets()->max('order') ?? -1) + 1;

        $set = CourseSet::create([
            'name'      => $data['name'],
            'course_id' => $course->id,
            'order'     => $order,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Set successfully added',
            'data'    => [
                'name'  => $set->name,
                'order' => $set->order,
                'id'    => $set->id,
            ],
        ], 201);
    }

    /** C2 - Delete set (admin). Set harus milik kursus pada URL. */
    public function destroy(string $slug, $setId)
    {
        $course = Course::where('slug', $slug)->firstOrFail();

        $set = CourseSet::where('course_id', $course->id)->where('id', $setId)->firstOrFail();
        $set->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Set successfully deleted',
        ], 200);
    }
}
