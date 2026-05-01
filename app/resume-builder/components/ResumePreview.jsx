import ModernTemplate from "@/public/assets/templates/ModernTemplate";
import MinimalImageTemplate from "@/public/assets/templates/MinimalImageTemplate";
import MinimalTemplate from "@/public/assets/templates/MinimalTemplate";
import ClassicTemplate from "@/public/assets/templates/ClassicTemplate";
import MinimalistTemplate from "@/public/assets/templates/MinimalistTemplate";
import CreativeVisualTemplate from "@/public/assets/templates/CreativeVisualTemplate";
import CorporateATSTemplate from "@/public/assets/templates/CorporateATSTemplate";
import ModernProTemplate from "@/public/assets/templates/ModernProTemplate";

export default function ResumePreview({ data, template, accentColor, classes = "" }) {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
        break;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
        break;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
        break;
      case "minimalist":
        return <MinimalistTemplate data={data} accentColor={accentColor} />;
        break;
      case "creativeVisual":
        return <CreativeVisualTemplate data={data} accentColor={accentColor} />;
        break;
      case "corporateATSTemplate":
        return <CorporateATSTemplate data={data} accentColor={accentColor} />;
        break;
      case "modernProTemplate":
        return <ModernProTemplate data={data} accentColor={accentColor} />;
        break;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div
        id="resume-preview"
        className={
          "border border-gray-200 print:shadow-none print:border-none " + classes
        }
      >
        {renderTemplate()}
      </div>

      <style jsx global>
        {`
          #resume-preview,
          #resume-preview * {
            overflow-wrap: anywhere;
            word-break: break-word;
          }

          @page {
            size: letter;
            margin: 0;
          }
          @media print {
            html,
            body {
              width: 8.5in;
              height: 11in;
              margin: 0 !important;
              padding: 0 !important;
              overflow: visible !important;
            }
            body * {
              visibility: hidden !important;
            }
            .resume-builder-shell,
            .resume-builder-shell * {
              background: white !important;
            }
            .resume-editor-panel,
            .resume-actions {
              display: none !important;
            }
            #resume-preview,
            #resume-preview * {
              visibility: visible !important;
            }
            #resume-preview {
              position: fixed !important;
              left: 0;
              top: 0;
              width: 8.5in !important;
              min-height: 11in !important;
              margin: 0 !important;
              padding: 0 !important;
              box-shadow: none !important;
              border: none !important;
              background: white !important;
            }
          }
        `}
      </style>
    </div>
  );
};
