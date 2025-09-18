import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import {
  useFormContext,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { imageSchema } from "@/shared/schema/imageSchema";

export type RHFFileInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  existing?: string[];
  imagesPath?: string;
  onRemoveExistingImage?: (name: string) => void;
} & Omit<ComponentPropsWithoutRef<"input">, "type" | "value">;

type PreviewFile = {
  url: string;
  file: File;
  error: string;
};

const RHFFileInput = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  existing = [],
  imagesPath = "/uploads/tours",
  onRemoveExistingImage,
  ...props
}: RHFFileInputProps<T>) => {
  const [previews, setPreviews] = useState<PreviewFile[]>([]);

  const { watch } = useFormContext();
  const images = watch(name);

  const validateFiles = useCallback(
    async (files: File[]) => {
      if (!files.length) return [];
      const results = await Promise.all(
        files.map(async (file) => {
          const result = await imageSchema.safeParseAsync(file);
          return {
            file,
            url: URL.createObjectURL(file),
            error: result.success ? "" : result.error.issues[0].message,
          };
        })
      );

      setPreviews(props.multiple ? results : results.slice(0, 1));

      return results.filter((r) => !r.error).map((r) => r.file);
    },
    [props.multiple]
  );

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  useEffect(() => {
    if (!images) return;
    const initPreviews = async () => {
      // If multiple: array of File | string
      const files = Array.isArray(images) ? images : [images];
      await validateFiles(files);
    };

    initPreviews();
  }, [images, validateFiles]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <div className="space-y-2">
              <Input
                {...props}
                type="file"
                accept="image/*"
                multiple={props.multiple}
                className="block w-full rounded-md border border-dashed border-gray-300 text-sm text-muted-foreground file:mr-2 file:rounded-md file:border-0 file:bg-primary/90 file:px-4 file:text-white file:text-sm file:font-medium hover:file:bg-primary/90 transition cursor-pointer"
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  const valid = await validateFiles(files);

                  const newValue = props.multiple ? valid : valid[0] ?? null;
                  field.onChange(newValue);

                  // Clear input to allow same file re-upload
                  e.target.value = "";
                }}
              />

              {/* Show preview of newly added files */}
              {previews.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {previews.map((item, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={item.url}
                        alt={`preview-${idx}`}
                        className="size-20 sm:size-28 rounded border object-cover"
                      />
                      {item.error && (
                        <p className="text-xs text-red-500">{item.error}</p>
                      )}
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        onClick={() => {
                          const next = previews.filter((_, i) => i !== idx);
                          setPreviews(next);
                          const valid = next
                            .filter((p) => !p.error)
                            .map((p) => p.file);
                          field.onChange(
                            props.multiple ? valid : valid[0] ?? null
                          );
                        }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Show existing images if no new previews */}
              {previews.length === 0 && existing.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {existing.map((name, i) => {
                    console.log("Avatar", name);
                    return (
                      <div key={i} className="relative">
                        <img
                          src={
                            /^https?:\/\//i.test(name)
                              ? name
                              : `${imagesPath}/${name}`
                          }
                          alt={name}
                          className="size-20 rounded border object-cover"
                        />
                        {onRemoveExistingImage && (
                          <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            onClick={() => onRemoveExistingImage(name)}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFFileInput;
