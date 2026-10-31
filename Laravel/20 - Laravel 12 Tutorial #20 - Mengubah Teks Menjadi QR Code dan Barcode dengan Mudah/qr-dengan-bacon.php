<?php
// Alternatif untuk proyek yang memakai Fortify / starter kit
// (bacon/bacon-qr-code sudah ter-install lewat Fortify)

use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;

function qrSvg(string $teks, int $ukuran = 200): string
{
    $renderer = new ImageRenderer(
        new RendererStyle($ukuran),
        new SvgImageBackEnd()
    );

    return (new Writer($renderer))->writeString($teks);
}

// Di view: {!! qrSvg(route('products.show', $product)) !!}
