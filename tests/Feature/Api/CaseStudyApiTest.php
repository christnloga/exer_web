<?php

use App\Models\CaseStudy;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('api can fetch case studies', function () {
    CaseStudy::factory()->count(3)->create();

    $response = $this->get(route('api.case-studies.index'));

    $response->assertOk();
    $response->assertJsonCount(3);
});
