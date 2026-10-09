/* Kala Nidhi progressive frontend enhancements — no backend dependency. */
(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    // Make the visual category shortcuts drive the existing marketplace filter.
    document.querySelectorAll("[data-category-link]").forEach((link) => {
      link.addEventListener("click", () => {
        const categoryFilter = document.getElementById("categoryFilter");
        if (!categoryFilter) return;
        const targetCategory = link.getAttribute("data-category-link");
        const option = Array.from(categoryFilter.options).find(
          (item) => item.value === targetCategory || item.textContent.trim() === targetCategory
        );
        if (option) {
          categoryFilter.value = option.value;
          if (typeof window.filterProducts === "function") window.filterProducts();
        }
      });
    });

    // Preview selected image files in the UI without uploading or changing form behavior.
    const previewConfig = [
      { inputId: "artisanImageFile", containerId: "artisanImagePreview", multiple: false },
      { inputId: "productPhoto", containerId: "productImagePreview", multiple: true }
    ];

    previewConfig.forEach(({ inputId, containerId, multiple }) => {
      const input = document.getElementById(inputId);
      if (!input) return;

      let preview = document.getElementById(containerId);
      if (!preview) {
        preview = document.createElement("div");
        preview.id = containerId;
        preview.className = "heritage-preview-grid";
        preview.setAttribute("aria-live", "polite");
        input.insertAdjacentElement("afterend", preview);
      }

      input.addEventListener("change", () => {
        preview.replaceChildren();
        const files = Array.from(input.files || []).filter((file) => file.type.startsWith("image/"));
        const limitedFiles = multiple ? files.slice(0, 6) : files.slice(0, 1);

        limitedFiles.forEach((file) => {
          const item = document.createElement("div");
          item.className = "heritage-preview-item";

          const image = document.createElement("img");
          image.alt = `Preview of ${file.name}`;
          image.src = URL.createObjectURL(file);
          image.onload = () => URL.revokeObjectURL(image.src);

          const caption = document.createElement("span");
          caption.textContent = file.name;

          item.append(image, caption);
          preview.append(item);
        });

        if (files.length > limitedFiles.length) {
          const note = document.createElement("p");
          note.className = "heritage-preview-note";
          note.textContent = "Showing the first " + limitedFiles.length + " selected image(s).";
          preview.append(note);
        }
      });
    });

    // Password visibility toggle on authentication forms, inserted as a button beside each password field.
    document.querySelectorAll('input[type="password"]').forEach((input) => {
      if (input.dataset.visibilityControl === "added") return;
      input.dataset.visibilityControl = "added";

      const wrapper = document.createElement("div");
      wrapper.className = "heritage-password-wrap";
      input.parentNode.insertBefore(wrapper, input);
      wrapper.appendChild(input);

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "heritage-password-toggle";
      toggle.setAttribute("aria-label", "Show password");
      toggle.innerHTML = '<i class="fa-regular fa-eye" aria-hidden="true"></i>';
      toggle.addEventListener("click", () => {
        const showing = input.type === "text";
        input.type = showing ? "password" : "text";
        toggle.setAttribute("aria-label", showing ? "Show password" : "Hide password");
        toggle.innerHTML = showing
          ? '<i class="fa-regular fa-eye" aria-hidden="true"></i>'
          : '<i class="fa-regular fa-eye-slash" aria-hidden="true"></i>';
      });
      wrapper.appendChild(toggle);
    });
  });
})();
