import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Database,
  FileText,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DataUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<Array<{id: string, name: string, size: string, status: 'success' | 'processing' | 'error'}>>([]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  };

  const processFiles = (files: File[]) => {
    files.forEach((file) => {
      const fileId = Math.random().toString(36);
      const newFile = {
        id: fileId,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        status: 'processing' as const
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate processing
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === fileId 
              ? { ...f, status: Math.random() > 0.2 ? 'success' : 'error' }
              : f
          )
        );
        
        if (Math.random() > 0.2) {
          toast({
            title: "File processed successfully",
            description: `${file.name} has been uploaded and analyzed.`,
          });
        } else {
          toast({
            title: "Processing failed",
            description: `Error processing ${file.name}. Please try again.`,
            variant: "destructive",
          });
        }
      }, 2000);
    });
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const sampleData = [
    { field: 'Date', example: '2024-01-15', description: 'Sale date (YYYY-MM-DD format)' },
    { field: 'Product', example: 'Rice 1kg', description: 'Product name and quantity' },
    { field: 'Category', example: 'Groceries', description: 'Product category' },
    { field: 'Quantity', example: '25', description: 'Units sold' },
    { field: 'Unit Price', example: '45.00', description: 'Price per unit (₹)' },
    { field: 'Total', example: '1125.00', description: 'Total sale amount (₹)' },
    { field: 'Customer', example: 'Rajesh Kumar', description: 'Customer name (optional)' },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Upload Area */}
      <Card className="bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Upload className="h-5 w-5 text-primary" />
            <span>Upload Sales Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
          >
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground">Drag & drop your files here</h3>
                <p className="text-muted-foreground">
                  Support for CSV, Excel files (.csv, .xlsx, .xls)
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <label>
                  <Button variant="hero" className="cursor-pointer">
                    Choose Files
                  </Button>
                  <input
                    type="file"
                    multiple
                    accept=".csv,.xlsx,.xls"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Sample
                </Button>
              </div>
            </div>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-foreground">Uploaded Files</h4>
              {uploadedFiles.map((file) => (
                <div 
                  key={file.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg bg-card/50"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{file.size}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {file.status === 'success' && (
                      <Badge className="bg-success text-success-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Processed
                      </Badge>
                    )}
                    {file.status === 'processing' && (
                      <Badge variant="secondary">
                        Processing...
                      </Badge>
                    )}
                    {file.status === 'error' && (
                      <Badge variant="destructive">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Error
                      </Badge>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Format Guide */}
      <Card className="bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Database className="h-5 w-5 text-primary" />
            <span>Expected Data Format</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Ensure your sales data includes the following columns for best results:
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-semibold text-foreground">Field</th>
                    <th className="text-left py-2 px-3 font-semibold text-foreground">Example</th>
                    <th className="text-left py-2 px-3 font-semibold text-foreground">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((item, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-2 px-3 font-medium text-foreground">{item.field}</td>
                      <td className="py-2 px-3 text-muted-foreground font-mono text-sm">{item.example}</td>
                      <td className="py-2 px-3 text-muted-foreground text-sm">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-accent/50 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Tips for better analysis:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Include at least 3 months of data for trend analysis</li>
                <li>• Ensure consistent product naming (e.g., "Rice 1kg" not "rice", "Rice", "1kg rice")</li>
                <li>• Use standard date format (YYYY-MM-DD)</li>
                <li>• Include customer information for segmentation insights</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataUpload;