<?php

namespace App\Http\Controller;

use App\Models\Workshop;
use Illuminate\Http\Request;

class UpcomingWorkshopController extends Controller
{
    public function __invoke(Request $request)
    {
        return Workshop::where('status', 'open')
            ->where('event_date', '>=', now())
            ->orderBy('event_date', 'asc')
            ->taken(5)
            ->get();
    }
}