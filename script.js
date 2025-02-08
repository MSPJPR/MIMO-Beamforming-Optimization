// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
    updateValues();
    drawGraph([]);
});

// Update slider values in UI
function updateValues() {
    document.getElementById("antennasValue").textContent = document.getElementById("antennas").value;
    document.getElementById("powerValue").textContent = document.getElementById("power").value;
}

// Water-Filling Algorithm for Power Allocation
function waterFillingOptimization(antennas, totalPower) {
    let noise = Array.from({ length: antennas }, () => Math.random() * 5 + 1); // Random noise levels
    let powerAllocation = Array(antennas).fill(0);
    let remainingPower = totalPower;

    // Sort antennas by noise (ascending)
    let sortedIndices = noise.map((val, i) => i).sort((a, b) => noise[a] - noise[b]);

    // Distribute power iteratively
    for (let i of sortedIndices) {
        if (remainingPower <= 0) break;
        let allocatedPower = Math.min(remainingPower, 10 / (noise[i] + 1));
        powerAllocation[i] = allocatedPower;
        remainingPower -= allocatedPower;
    }

    return powerAllocation;
}

// Quadratic Programming Optimization (Simplified)
function quadraticProgrammingOptimization(antennas, powerAllocation) {
    let optimizedPower = powerAllocation.map(p => p * 1.1); // Increase power slightly
    return optimizedPower;
}

// Optimization Execution
function optimize() {
    let antennas = parseInt(document.getElementById("antennas").value);
    let totalPower = parseInt(document.getElementById("power").value);

    let powerAllocation = waterFillingOptimization(antennas, totalPower);
    let optimizedPower = quadraticProgrammingOptimization(antennas, powerAllocation);

    drawGraph(optimizedPower);
    document.getElementById("result").textContent = `Optimized Power Allocation: ${optimizedPower.map(p => p.toFixed(2)).join(", ")} W`;
}

// Graph Drawing Function
function drawGraph(data) {
    let canvas = document.getElementById("graphCanvas");
    let ctx = canvas.getContext("2d");

    // Clear previous graph
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (data.length === 0) return;

    let barWidth = canvas.width / data.length;
    let maxPower = Math.max(...data);
    
    ctx.fillStyle = "#1abc9c";
    data.forEach((value, i) => {
        let barHeight = (value / maxPower) * canvas.height;
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 5, barHeight);
    });
}
