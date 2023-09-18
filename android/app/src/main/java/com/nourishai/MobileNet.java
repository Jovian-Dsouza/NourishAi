package com.nourishai;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.Log;
import android.util.Pair;

import com.nourishai.ml.FoodModel;

import org.tensorflow.lite.DataType;
import org.tensorflow.lite.support.common.ops.NormalizeOp;
import org.tensorflow.lite.support.image.ImageProcessor;
import org.tensorflow.lite.support.image.TensorImage;
import org.tensorflow.lite.support.image.ops.ResizeOp;
import org.tensorflow.lite.support.tensorbuffer.TensorBuffer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class MobileNet {

    private final Context context;
    private final List<String> labels = new ArrayList<>();
    private final ImageProcessor imageProcessor;
    private FoodModel model;

    private static final String TAG = "MobileNet";

    public MobileNet(Context context) {
        this.context = context;

        labels.addAll(readLabelsFromAsset("food101labels.txt"));

        imageProcessor = new ImageProcessor.Builder()
                .add(new ResizeOp(224, 224, ResizeOp.ResizeMethod.BILINEAR))
                .add(new NormalizeOp(0f, 255f))
                .build();

        try {
            model = FoodModel.newInstance(context);
        } catch (IOException e) {
            // TODO Handle the exception
        }
    }

    private List<String> readLabelsFromAsset(String fileName) {
        List<String> labels = new ArrayList<>();
        try {
            InputStream inputStream = context.getAssets().open(fileName);
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                labels.add(line);
            }
            bufferedReader.close();
        } catch (IOException e) {
            Log.e(TAG, "Error reading labels from asset", e);
        }
        return labels;
    }

    public Pair<String, Float> predict(Bitmap bitmap) {
        TensorImage tensorImage = new TensorImage(DataType.FLOAT32);
        tensorImage.load(bitmap);

        tensorImage = imageProcessor.process(tensorImage);

        TensorBuffer inputFeature0 = TensorBuffer.createFixedSize(new int[]{1, 224, 224, 3}, DataType.FLOAT32);
        inputFeature0.loadBuffer(tensorImage.getBuffer());

        try {
            FoodModel.Outputs outputs = model.process(inputFeature0);
            TensorBuffer outputFeature0 = outputs.getOutputFeature0AsTensorBuffer();

            // Get prediction index from output features
            float[] probabilities = outputFeature0.getFloatArray();
            int maxIndex = -1;
            float maxConfidence = 0;
            for (int i = 0; i < probabilities.length; i++) {
                if (probabilities[i] > maxConfidence) {
                    maxConfidence = probabilities[i];
                    maxIndex = i;
                }
            }
            String prediction = labels.get(maxIndex);
            Log.d(TAG, "Prediction: " + prediction + " [" + maxIndex + "]");
            return new Pair<>(prediction, maxConfidence);
        } catch (Exception e) {
            Log.e(TAG, "Error during model prediction", e);
            return null;
        }
    }

    public void closeModel() {
        model.close();
    }
}
