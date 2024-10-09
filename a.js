fpsDropdown.addEventListener('change', function() {
    var frameRate = fpsDropdown.value;

    if (frameRate == 0) {
        // Turn off Posterize Time effect
        csInterface.evalScript(generateDisablePosterizeTimeScript());
    } else {
        // Adjust Posterize Time effect with the selected frame rate
        csInterface.evalScript(generateEnablePosterizeTimeScript(frameRate));
    }
});

function generateDisablePosterizeTimeScript() {
    var scriptParts = [];

    scriptParts.push('var fpsLayer = app.project.activeItem.layer("FPS");');
    scriptParts.push('if (fpsLayer) {');
    scriptParts.push('    var posterizeTimeEffect = fpsLayer.property("ADBE Effect Parade").property("Posterize Time");');
    scriptParts.push('    if (posterizeTimeEffect) {');
    scriptParts.push('        posterizeTimeEffect.enabled = false;  // Disable the Posterize Time effect');
    scriptParts.push('    }');
    scriptParts.push('}');

    return scriptParts.join('\n');
}

function generateEnablePosterizeTimeScript(frameRate) {
    var scriptParts = [];

    scriptParts.push('var fpsLayer = app.project.activeItem.layer("FPS");');
    scriptParts.push('if (fpsLayer) {');
    scriptParts.push('    var posterizeTimeEffect = fpsLayer.property("ADBE Effect Parade").property("Posterize Time");');
    scriptParts.push('    if (posterizeTimeEffect) {');
    scriptParts.push('        posterizeTimeEffect.enabled = true;   // Ensure the effect is enabled');
    scriptParts.push('        posterizeTimeEffect.property("Frame Rate").setValue(' + frameRate + ');');
    scriptParts.push('    }');
    scriptParts.push('}');

    return scriptParts.join('\n');
}
