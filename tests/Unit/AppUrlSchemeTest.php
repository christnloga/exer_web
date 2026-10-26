<?php

use App\Providers\AppServiceProvider;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\URL;

afterEach(function () {
    restore_error_handler();
    restore_exception_handler();
});

it('forces https URLs when the configured app url uses https', function () {
    $app = require __DIR__.'/../../bootstrap/app.php';

    $app->make(Kernel::class)->bootstrap();

    config(['app.url' => 'https://exer-htc.com']);

    (new AppServiceProvider($app))->boot();

    expect(URL::asset('build/assets/app.js'))->toStartWith('https://');
});

it('does not force https when the configured app url uses http', function () {
    $app = require __DIR__.'/../../bootstrap/app.php';

    $app->make(Kernel::class)->bootstrap();

    config(['app.url' => 'http://localhost']);

    (new AppServiceProvider($app))->boot();

    expect(URL::asset('build/assets/app.js'))->toStartWith('http://');
});
