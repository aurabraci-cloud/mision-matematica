/**
 * MISIÓN MATEMÁTICA — MANIPULATIVOS Y WIDGETS INTERACTIVOS
 * Representaciones visuales concretas (CPA: Concreto -> Pictórico -> Abstracto)
 * para la Fase 1 (Descubre) y ayudas de visualización en ejercicios.
 */

window.GAME_WIDGETS = (function () {

  // 1. Manipulativo de Suma (Juntar elementos)
  function renderAddManipulative(leftCount, rightCount, emoji = "🍎") {
    let leftHtml = "";
    for (let i = 0; i < leftCount; i++) {
      leftHtml += `<span class="manipulative-item">${emoji}</span>`;
    }

    let rightHtml = "";
    for (let i = 0; i < rightCount; i++) {
      rightHtml += `<span class="manipulative-item">${emoji}</span>`;
    }

    return `
      <div class="interactive-sandbox">
        <div class="manipulative-group">
          <div class="group-box" title="${leftCount} elementos">${leftHtml}</div>
          <span class="manipulative-operator">+</span>
          <div class="group-box" title="${rightCount} elementos">${rightHtml}</div>
        </div>
        <div class="formula-highlight">${leftCount} + ${rightCount} = ${leftCount + rightCount}</div>
      </div>
    `;
  }

  // 2. Manipulativo de Resta (Quitar elementos)
  function renderSubManipulative(totalCount, subCount, emoji = "💧") {
    let itemsHtml = "";
    const remaining = totalCount - subCount;
    for (let i = 0; i < totalCount; i++) {
      const isSubtracted = i >= remaining;
      itemsHtml += `
        <span class="manipulative-item ${isSubtracted ? 'item-crossed' : ''}" 
              style="${isSubtracted ? 'opacity: 0.3; filter: grayscale(1);' : ''}">
          ${emoji}
        </span>
      `;
    }

    return `
      <div class="interactive-sandbox">
        <div class="manipulative-group">
          ${itemsHtml}
        </div>
        <div class="formula-highlight">${totalCount} - ${subCount} = ${remaining}</div>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Quedan ${remaining} elementos activos (los atenuados fueron restados).</p>
      </div>
    `;
  }

  // 3. Manipulativo de Multiplicación (Matriz de Cuadrícula / Grupos)
  function renderMultGrid(rows, cols, emoji = "🚀") {
    let gridHtml = `<div style="display: grid; grid-template-columns: repeat(${cols}, auto); gap: 10px; justify-content: center; margin: 10px 0;">`;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        gridHtml += `<span class="manipulative-item" style="font-size: 1.8rem;" title="Fila ${r+1}, Columna ${c+1}">${emoji}</span>`;
      }
    }
    gridHtml += `</div>`;

    return `
      <div class="interactive-sandbox">
        <p style="color: var(--color-xp); font-weight: 700;">${rows} filas × ${cols} columnas</p>
        ${gridHtml}
        <div class="formula-highlight">${rows} × ${cols} = ${rows * cols}</div>
      </div>
    `;
  }

  // 4. Manipulativo de División (Reparto equitativo en cofres / platos)
  function renderDivSharing(total, recipients, emoji = "🍞") {
    const perPlate = Math.floor(total / recipients);
    let platesHtml = `<div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">`;
    for (let i = 0; i < recipients; i++) {
      let itemsInside = "";
      for (let j = 0; j < perPlate; j++) {
        itemsInside += `<span class="manipulative-item">${emoji}</span>`;
      }
      platesHtml += `
        <div style="background: rgba(255,255,255,0.08); border: 2px dashed rgba(255,255,255,0.3); border-radius: 12px; padding: 12px; min-width: 90px; text-align: center;">
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Grupo ${i + 1}</div>
          <div style="font-size: 1.6rem; display: flex; gap: 4px; justify-content: center;">${itemsInside}</div>
          <div style="font-family: var(--font-fun); font-weight: 700; color: var(--color-coin); font-size: 0.95rem; margin-top: 4px;">${perPlate}</div>
        </div>
      `;
    }
    platesHtml += `</div>`;

    return `
      <div class="interactive-sandbox">
        <p style="color: var(--color-xp); font-weight: 700;">${total} elementos repartidos entre ${recipients} grupos iguales</p>
        ${platesHtml}
        <div class="formula-highlight" style="margin-top: 14px;">${total} ÷ ${recipients} = ${perPlate}</div>
      </div>
    `;
  }

  // 5. Manipulativo de Operaciones Combinadas (Árbol jerárquico / Orden de resolución)
  function renderCombHierarchy(equation, steps) {
    let stepsListHtml = steps.map((s, idx) => `
      <div class="explanation-step-item">
        <span style="font-family: var(--font-fun); font-weight: 800; color: var(--color-xp);">${idx + 1}.</span>
        <span>${s}</span>
      </div>
    `).join("");

    return `
      <div class="interactive-sandbox">
        <div class="formula-highlight" style="letter-spacing: 2px; color: var(--color-coin);">${equation}</div>
        <div class="explanation-steps-list" style="margin-top: 16px;">
          ${stepsListHtml}
        </div>
      </div>
    `;
  }

  return {
    renderDiscoveryVisual: function (discovery) {
      if (!discovery) return "";
      const type = discovery.visualType;
      if (type === "manipulative_add" || type === "manipulative_base10" || type === "manipulative_carry") {
        return renderAddManipulative(discovery.leftCount || 3, discovery.rightCount || 2, discovery.itemEmoji || "🍎");
      }
      if (type === "manipulative_sub" || type === "manipulative_sub_dec" || type === "manipulative_compare" || type === "manipulative_borrow") {
        return renderSubManipulative(discovery.leftCount || 6, discovery.rightCount || 2, discovery.itemEmoji || "💧");
      }
      if (type === "manipulative_mult_groups" || type === "manipulative_mult_grid" || type === "manipulative_mult_patterns" || type === "manipulative_mult_distributive") {
        return renderMultGrid(discovery.rows || discovery.groupCount || 3, discovery.cols || discovery.itemsPerGroup || 4, discovery.itemEmoji || "🚀");
      }
      if (type === "manipulative_div_share" || type === "manipulative_div_family" || type === "manipulative_div_twodigit" || type === "manipulative_div_check") {
        return renderDivSharing(discovery.totalItems || 12, discovery.recipientCount || discovery.divisor || 3, discovery.itemEmoji || "🍞");
      }
      return renderCombHierarchy(discovery.equation || "2 + 3 × 4 = 14", discovery.explanationSteps || []);
    }
  };
})();
